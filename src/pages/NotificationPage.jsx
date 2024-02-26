import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/NotificationPage.css'
import React, {useState} from 'react';
// import { Link } from 'react-router-dom';

function NotificationPage() {
  
  const [commentsChecked, setCommentsChecked] = useState(false);
  const [likesChecked, setLikesChecked] = useState(false);
  const [reviewChecked, setReviewChecked] = useState(false);
  const [mentionsChecked, setMentionsChecked] = useState(false);
  const [purchasesChecked, setPurchasesChecked] = useState(false);
  const [messageChecked, setMessageChecked] = useState(false);

  const handleCommentsChange = () => {
    setCommentsChecked(!commentsChecked);
  };

  const handleLikesChange = () => {
    setLikesChecked(!likesChecked);
  };

  const handleReviewChange = () => {
    setReviewChecked(!reviewChecked);
  };

  const handleMentionsChange = () => {
    setMentionsChecked(!mentionsChecked);
  };

  const handlePurchasesChange = () => {
    setPurchasesChecked(!purchasesChecked);
  };

  const handleMessageChange = () => {
    setMessageChecked(!messageChecked);
  };
    return (
    

    <div className="notification-container">
      <aside className="sidebar">
        <div className="sidebar-item">
          <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
          <span>Welcome to [user email]</span>
        </div>
        <nav className="navigation-menu">
          <a href="#" className="menu-item">Task Overview</a>
          <a href="#" className="menu-item">Classes</a>
          <a href="#" className="menu-item">Grades</a>
          <a href="#" className="menu-item">Teachers</a>
          <a href="#" className="menu-item">Notes</a>
          <a href="#" className="menu-item">Preferences</a>
          <a href="#" className="menu-item">Log out</a>
        </nav>
      </aside>
      <main className="main-content">
        <div className="search-bar">
          <input type="text" placeholder="Search for a task" />
        </div>
        <div className="reminders">
          <h1>Reminders</h1>
          <div className="task-list">
            <div className="task-item">
              <div className="task-info">
                <img src="/path/to/user1.jpg" alt="Anna" className="task-user-pic" />
                <div>
                  <p className="task-title">Meeting with Anna</p>
                  <p className="task-time">at 3 PM</p>
                  <p className="task-comment">Great job, thanks!</p>
                </div>
              </div>
              <div className="task-actions">
                <button className="like-button">Like</button>
                <button className="reply-button">Reply</button>
              </div>
            </div>
            <div className="task-item">
              <div className="task-info">
                <img src="/path/to/user2.jpg" alt="Bafalda" className="task-user-pic" />
                <div>
                  <p className="task-title">Call from Bafalda</p>
                  <p className="task-subtitle">on Task-3600</p>
                  <p className="task-comment">Great job, thanks!</p>
                </div>
              </div>
              <div className="task-actions">
                <button className="like-button">Like</button>
                <button className="reply-button">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <aside className="right-sidebar">
        <button className="add-task-btn">Add Task</button>
        <div className="filter-section">
          <h2>Filter Tasks</h2>
          <div className="filters">
            <div className="filter"><input type="checkbox" id="comments" checked={commentsChecked} onChange={handleCommentsChange} />
            <label htmlFor="comments">Comments</label></div>
            <div className="filter"><input type="checkbox" id="likes" checked={likesChecked} onChange={handleLikesChange} />
            <label htmlFor="likes">Likes</label></div>
            <div className="filter"><input type="checkbox" id="review" checked={reviewChecked} onChange={handleReviewChange} />
            <label htmlFor="review">Review</label></div>
            <div className="filter"><input type="checkbox" id="mentions" checked={mentionsChecked} onChange={handleMentionsChange} />
            <label htmlFor="mentions">Mentions</label></div>
            <div className="filter"><input type="checkbox" id="purchases" checked={purchasesChecked} onChange={handlePurchasesChange} />
            <label htmlFor="purchases">Purchases</label></div>
            <div className="filter"><input type="checkbox" id="message" checked={messageChecked} onChange={handleMessageChange} />
            <label htmlFor="message">Message</label></div>
          </div>
          <div className="filter-actions">
            <button className="filter-btn">Select All</button>
            <button className="filter-btn">Unselect All</button>
          </div>
        </div>
      </aside>
    </div>



     );
}

export default NotificationPage;