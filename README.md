## 💼 6. ITviec Clone – Job Recruitment Web App

> 🧠 This project was built mainly for **practice** — to improve UI slicing skills and simulate API calls.  
> It still has many limitations such as missing **cleanup in `useEffect`**, no **Error Boundary**,  
> **mixed UI and logic**, no **token refresh / access token flow**, **no environment variables**,  
> and **no code splitting or advanced security handling**.  
> All of these will be addressed and improved in the **next version**.
> 
[🔗 Live Demo](https://itviec-clone-eta.vercel.app/)

> ⚠️ **Note:** This project uses **JSON Server** as a mock backend and database.  
> The API is deployed on **Render (free plan)**, which goes into **sleep mode** after inactivity.  
> As a result, the **first load may take 20–60 seconds** while the server wakes up.  
> If the data doesn’t appear immediately, please refresh the page after a short delay.

**🧪 Test Accounts**

**Job Seeker**
```json
{
  "email": "seeker1@example.com",
  "passwordHash": "hashed_password1"
}
```
**Employer**
```json
{
  "email": "mcredit@example.com",
  "passwordHash": "hashed_password5"
}
```

### 🔧 Tech Stack

* ReactJS + SCSS
* Redux, React Router
* Ant Design, SwiperJS, TipTap
* JSON Server (temporary backend)

### 🌟 Main Features

👉 **For Job Seekers**

* Register / Login with cookie-based token storage
* Browse job listings and detailed company information
* Apply for jobs and view application history

🛠 **For Employers**

* Manage job postings and candidate applications
* Create job descriptions using a rich text editor (TipTap)

📦 **State Management**

* Authentication, job data, and applications are managed via Redux

### 📱 Responsive

* Fully responsive design that works smoothly across desktop, tablet, and mobile screens

---

### 📚 What I Learned

* How to structure a real-world React project with professional folder organization (`pages/`, `services/`, `helpers/`, `reducers/`, etc.)
* Managing global state using Redux
* Connecting to and consuming a RESTful mock API (JSON Server)
* Building modern UI with Ant Design, SwiperJS, and modal interactions
* Integrating a rich-text editor (TipTap) for job content input

---

### 📉 Areas for Improvement

* Lacks a real backend for complex logic (currently using JSON Server)
* No cloud storage for images yet (currently using base64)
* Codebase needs refactoring and better separation of logic (planned for the next version)

---

### 🚀 Next Steps

👉 Integrate a real backend using Node.js + Express or Supabase/Firebase
👉 Use Cloudinary or Firebase Storage for image uploads and rendering
👉 Refactor code with Redux Toolkit (`createSlice`, `createAsyncThunk`)
👉 Improve project structure and component logic separation
👉 Add full PWA support for offline usage and better performance

---

### 📢 Contact

Feel free to reach out if you have feedback or ideas!

---

> *"Never stop learning – each project is a building block toward becoming a professional Front-end Developer."*
