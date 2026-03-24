import React, { useState } from "react";
import "./firebase";
function App() {
  console.log("firebase connected faa");
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [note, setNote] = useState(null);

  const handleUpload = () => {
    if (!title) return alert("Enter course title");

    const newCourse = {
      id: Date.now(),
      title,
      video: video ? URL.createObjectURL(video) : null,
      note: note ? URL.createObjectURL(note) : null,
    };

    setCourses([newCourse, ...courses]);
    setTitle("");
    setVideo(null);
    setNote(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#1e3a8a", color: "white", padding: "20px" }}>
        <h2>Admin</h2>
        <p>Dashboard</p>
        <p>Courses</p>
        <p>Settings</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>📊 Dashboard</h1>
        <p>Total Courses: {courses.length}</p>

        {/* Upload */}
        <div style={{ marginTop: "20px" }}>
          <h2>📤 Upload Course</h2>
          
          <input 
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br /><br />

          <input type="file" onChange={(e) => setVideo(e.target.files[0])} /><br /><br />
          <input type="file" onChange={(e) => setNote(e.target.files[0])} /><br /><br />

          <button onClick={handleUpload}>Upload</button>
        </div>

        {/* Courses List */}
        <div style={{ marginTop: "30px" }}>
          <h2>📚 Courses</h2>

          {courses.map((course) => (
            <div key={course.id} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
              
              <h3>{course.title}</h3>

              {course.video && (
                <video width="300" controls>
                  <source src={course.video} />
                </video>
              )}

              <br />

              {course.note && (
                <a href={course.note} target="_blank" rel="noreferrer">
                  View Notes 📄
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
 