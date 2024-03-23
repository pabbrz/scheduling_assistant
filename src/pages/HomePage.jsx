import React from 'react';

const Homepage = () => {
  return (
    <div>
      <h1>Google Calendar</h1>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%234285F4&src=amFjazRyb25kb0BnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uY2hyaXN0aWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZmFtaWx5MTEwNDU4NzYwMTg2ODEyOTI3MzNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4uaGluZHVpc20jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uanVkYWlzbSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4uaXNsYW1pYyNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4ub3J0aG9kb3hfY2hyaXN0aWFuaXR5I2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237986CB&color=%2333B679&color=%234285F4&color=%23AD1457&color=%237CB342&color=%230B8043&color=%23F6BF26&color=%23F4511E&color=%23B39DDB"
        style={{ border: 'solid 1px #777' }} // Pass a style object here
        width="800"
        height="600"
        frameBorder="0" // Fixing the camelCase property name
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Homepage;