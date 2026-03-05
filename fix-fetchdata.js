const fs = require('fs');
let content = fs.readFileSync('src/app/shion-control-panel/page.tsx', 'utf8');

const oldFunc = `  async function fetchData() {
    try {
      const [postsRes, momentsRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/moments"),
      ]);
      const postsData = await postsRes.json();
      const momentsData = await momentsRes.json();
      setPosts(postsData);
      setMoments(momentsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }`;

const newFunc = `  async function fetchData() {
    try {
      const [postsRes, momentsRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/moments"),
      ]);
      
      // 检查响应是否成功
      if (postsRes.ok) {
        const postsData = await postsRes.json();
        // 确保返回的是数组（防止错误对象被设置）
        setPosts(Array.isArray(postsData) ? postsData : []);
      } else {
        console.error("Failed to fetch posts:", await postsRes.text());
        setPosts([]);
      }
      
      if (momentsRes.ok) {
        const momentsData = await momentsRes.json();
        setMoments(Array.isArray(momentsData) ? momentsData : []);
      } else {
        console.error("Failed to fetch moments:", await momentsRes.text());
        setMoments([]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setPosts([]);
      setMoments([]);
    } finally {
      setLoading(false);
    }
  }`;

if (content.includes(oldFunc)) {
    content = content.replace(oldFunc, newFunc);
    fs.writeFileSync('src/app/shion-control-panel/page.tsx', content);
    console.log('Fixed fetchData function!');
} else {
    console.log('Pattern not found');
    process.exit(1);
}