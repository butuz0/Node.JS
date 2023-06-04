import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "19902004",
    host: "localhost",
    port: 5432,
    database: "postgres",
});

//selects for the tasks in order from the first to the sixth
const tasks = [
    "SELECT user_id, name, avatar_url, photo_url, description, created_at FROM users INNER JOIN channels ON users.id = channels.user_id ORDER BY created_at DESC",
    "SELECT id, videos.*, SUM(CASE WHEN positive THEN 1 ELSE 0 END) AS amount_of_likes FROM videos INNER JOIN likes ON videos.id = likes.video_id GROUP BY videos.id ORDER BY amount_of_likes DESC LIMIT 5",
    "SELECT videos.id, title, preview_url, duration, published_at FROM videos INNER JOIN subscriptions ON videos.channel_id = subscriptions.channel_id INNER JOIN users ON subscriptions.user_id = users.id  WHERE users.name = 'Stephanie Bulger' ORDER BY published_at DESC",
    "SELECT channels.*, COUNT(subscriptions.channel_id) AS subscribers FROM channels INNER JOIN subscriptions ON channels.id = subscriptions.channel_id WHERE channels.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76' GROUP BY channels.id",
    "SELECT id, videos.*, SUM(CASE WHEN positive THEN 1 ELSE 0 END) AS likes FROM videos INNER JOIN likes ON videos.id = likes.video_id WHERE videos.published_at >= '2021-09-01' GROUP BY videos.id HAVING SUM(CASE WHEN positive THEN 1 ELSE 0 END) > 4 ORDER BY likes DESC LIMIT 10",
    "SELECT users.name, users.avatar_url, channels.photo_url, channels.description, level, subscribed_at FROM users INNER JOIN channels ON users.id = channels.user_id INNER JOIN subscriptions ON channels.id = subscriptions.channel_id WHERE subscriptions.channel_id IN (SELECT channels.id FROM channels INNER JOIN subscriptions ON channels.id = subscriptions.channel_id INNER JOIN users ON subscriptions.user_id = users.id WHERE users.name = 'Ennis Haestier') ORDER BY (CASE level WHEN 'vip' THEN 1 WHEN 'follower' THEN 2 WHEN 'fan' THEN 3 WHEN 'standard' THEN 4 END) ASC, subscribed_at DESC",
];

console.log("result:");

tasks.forEach((task) => {
    (async () => {
        const res = await pool.query(task);
        console.log(res.rows);
    })();
});
