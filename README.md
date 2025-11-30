1. The **Task Manager System** is a web application where users can:

- Create, edit, delete tasks  
- Assign tasks to users  
- Track progress  
- Manage user accounts (Admin)  
- Manage user accounts (Teacher-(user))
- Use a modern UI using ShadcnUI 

The system uses:

- **Laravel** → Backend (server, database, logic)  
- **React** → Frontend (user interface)  
- **Inertia.js** → Bridge between Laravel and React  
- **MySQL** → Database  

---

 2. How the System Works (Simple Explanation)

### **1. Routes (web.php)**  
file path (routes\web.php)
Routes are the "addresses" of the website, e.g., `/tasks`, `/dashboard`, `/users`.  
Routes tell Laravel which controller to run.

### **2. Controllers**
file path (app\Http\Controllers)  
Controllers receive requests and return responses.  
Example: If a user opens `/tasks`, **TaskController** gets tasks from the database and sends them to the React page.

### **3. Models**  
file path (app\Models)
Models represent database tables, e.g., `Task.php` for the tasks table.  
They handle fetching, creating, updating, and deleting data.

### **4. Migrations**  
file path (database\migrations)
Migrations create the database tables. Think of them as **database blueprints**.

### **5. Pages (React)** 
file path (resources\js\pages ) 
Pages are the screens users see:

- Task list  
- Create Task  
- Edit Task  
- Users list  
- Dashboard  

Pages are stored in `resources/js/Pages/` and use the shared layout for sidebar navigation.

### **6. Layout & Sidebar**  
The sidebar provides navigation for the app:

file path (resources\js\components\app-sidebar.tsx)

- Dashboard  
- Tasks  
- Users  
- Settings  

All pages load inside this layout.
