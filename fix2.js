const fs = require('fs');
let content = fs.readFileSync('src/app/shion-control-panel/page.tsx', 'utf8');

// Find and replace fetchData function
const startMarker = 'async function fetchData() {';
const startIdx = content.indexOf(startMarker);

if (startIdx < 0) {
    console.log('fetchData not found');
    process.exit(1);
}

// Find the end of the function (next function definition or closing brace pattern)
let braceCount = 0;
let inFunction = false;
let endIdx = startIdx;

for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '{') {
        braceCount++;
        inFunction = true;
    } else if (content[i] === '}') {
        braceCount--;
        if (inFunction && braceCount === 0) {
            endIdx = i + 1;
            break;
        }
    }
}

const oldFunc = content.substring(startIdx - 2, endIdx);
console.log('Found function, length:', oldFunc.length);

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

content = content.substring(0, startIdx - 2) + newFunc + content.substring(endIdx);
fs.writeFileSync('src/app/shion-control-panel/page.tsx', content);
console.log('Fixed fetchData function!');
