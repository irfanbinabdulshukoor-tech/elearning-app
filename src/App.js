import { deleteDoc, doc } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";
import Login from "./Login";
import UserDashboard from "./UserDashboard";

function App() {

  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([""]);
  const [notes, setNotes] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [search, setSearch] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [role, setRole] = useState("");

  // DELETE
  const deleteCourse = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      fetchCourses();
    } catch {
      alert("Error deleting ❌");
    }
  };

  // FETCH
  const fetchCourses = async () => {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourses(data);
  };

  // UPLOAD
  const handleUpload = async () => {
    if (!title || videos.length === 0 || videos[0] === "") {
      alert("Add title and at least one video");
      return;
    }

    try {
      await addDoc(collection(db, "courses"), {
        title,
        videos,
        notes,
        thumbnail
      });

      alert("Course Added ✅");

      setTitle("");
      setVideos([""]);
      setNotes("");
      setThumbnail("");
      fetchCourses();

    } catch {
      alert("Error ❌");
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={mainContainer}>

      {isLoggedIn ? (
        role === "admin" ? (
          <>
            {/* NAVBAR */}
            <div style={navbar}>
              <h2>🎓 E-Learn</h2>
              <button onClick={() => setIsLoggedIn(false)} style={deleteBtn}>
                Logout
              </button>
            </div>

            {/* ADMIN */}
            <div style={{ padding: "30px" }}>
              <h1>👑 Admin Dashboard</h1>

              <div style={inputContainer}>

                <input
                  placeholder="Course Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={inputStyle}
                />

                {/* MULTI VIDEO INPUT */}
                {videos.map((vid, index) => (
                  <input
                    key={index}
                    placeholder={`Video ${index + 1}`}
                    value={vid}
                    onChange={(e) => {
                      const updated = [...videos];
                      updated[index] = e.target.value;
                      setVideos(updated);
                    }}
                    style={inputStyle}
                  />
                ))}

                <button
                  onClick={() => setVideos([...videos, ""])}
                  style={blueBtn}
                >
                  ➕ Add Video
                </button>

                <input
                  placeholder="Notes PDF link"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={inputStyle}
                />

                <input
                  placeholder="Thumbnail URL"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  style={inputStyle}
                />

                <input
                  placeholder="🔍 Search course..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={inputStyle}
                />

                <button onClick={handleUpload} style={greenBtn}>
                  Upload
                </button>

                <button onClick={fetchCourses} style={blueBtn}>
                  Load
                </button>
              </div>

              {/* COURSES */}
              <div style={grid}>
                {filteredCourses.length === 0 ? (
                  <p>No courses found 😢</p>
                ) : (
                  filteredCourses.map((course) => (
                    <div key={course.id} style={cardStyle}>
                      <h3>{course.title}</h3>

                      {/* MULTI VIDEO DISPLAY */}
                      {course.videos && course.videos.map((vid, index) => (
                        <iframe
  key={index}
 title={`course-${course.id}-video-${index}`}
  width="100%"
  height="150"
  src={vid}
  style={{ marginBottom: "10px" }}
  allowFullScreen
/>
                      ))}

                      {/* NOTES */}
                      {course.notes && (
                        <a href={course.notes} target="_blank" rel="noreferrer">
                          📄 View Notes
                        </a>
                      )}

                      <br /><br />

                      <button
                        onClick={() => deleteCourse(course.id)}
                        style={deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <UserDashboard />
        )
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
      )}
    </div>
  );
}

/* STYLES */
const mainContainer = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #5b82de, #7faaff)",
  color: "white"
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  background: "#111",
  alignItems: "center"
};

const inputContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "30px"
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  minWidth: "200px"
};

const cardStyle = {
  background: "white",
  color: "black",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.2)"
};

const greenBtn = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer"
};

const blueBtn = {
  background: "#2196F3",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer"
};

export default App;