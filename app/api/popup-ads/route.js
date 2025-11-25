import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'deepmasala',
};

// GET all popup ads
export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM popup_ads ORDER BY created_at DESC');
    await connection.end();

    // Normalize all ads to flat array
    const allAds = rows.flatMap(row => {
      let adContents = [];
      if (row.ads) {
        try {
          adContents = JSON.parse(row.ads);
        } catch (e) {
          console.error("Failed to parse ad JSON:", e);
        }
      }
      if (!Array.isArray(adContents)) adContents = [adContents];

      return adContents.map(ad => ({
        id: row.id,
        title: ad?.title || "Untitled Ad",
        color: ad?.color || "#000000",   // <-- 🎨 ADDED COLOR
        isActive: !!row.is_active,
      }));
    });

    return new Response(JSON.stringify(allAds), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST new ad
export async function POST(req) {
  try {
    let { ads, is_active } = await req.json();
    if (!ads) return new Response(JSON.stringify({ error: 'Ads JSON is required' }), { status: 400 });
    if (!Array.isArray(ads)) ads = [ads];

    // ensure color exists
    ads = ads.map(ad => ({
      ...ad,
      color: ad.color || "#000000",   // <-- 🎨 DEFAULT COLOR
    }));

    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO popup_ads (ads, is_active) VALUES (?, ?)',
      [JSON.stringify(ads), is_active ?? 1]
    );
    await connection.end();

    return new Response(JSON.stringify({ id: result.insertId, ads, is_active }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// PUT update ad
export async function PUT(req) {
  try {
    let { id, ads, is_active } = await req.json();
    if (!id || !ads) return new Response(JSON.stringify({ error: 'ID and Ads JSON are required' }), { status: 400 });
    if (!Array.isArray(ads)) ads = [ads];

    // ensure color exists
    ads = ads.map(ad => ({
      ...ad,
      color: ad.color || "#000000",   // <-- 🎨 DEFAULT COLOR
    }));

    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'UPDATE popup_ads SET ads = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [JSON.stringify(ads), is_active ?? 1, id]
    );
    await connection.end();

    if (result.affectedRows === 0) return new Response(JSON.stringify({ error: 'No ad found with this ID' }), { status: 404 });

    return new Response(JSON.stringify({ id, ads, is_active }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// DELETE ad
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });

    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('DELETE FROM popup_ads WHERE id = ?', [id]);
    await connection.end();

    if (result.affectedRows === 0) return new Response(JSON.stringify({ error: 'No ad found with this ID' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Ad deleted successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
