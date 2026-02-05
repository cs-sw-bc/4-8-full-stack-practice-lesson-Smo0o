# ✈️ Optional Challenge: Travel Wishlist App (One Model)

This is an **optional extension** for students who want to practice independently.

The goal is to build a small app that feels different from the Movie project, while still using the same core skills:

* Express routes
* Controllers
* Mongoose model
* EJS views

✅ **One model only**.

---

## 🎯 Objective

Build a **Travel Wishlist** where users can:

* View a list of destinations
* Add a new destination
* View destination details

---

## 📦 Model: Destination

Create a single model called `Destination`.

### Suggested fields

* `name` (String, required)
* `country` (String, required)
* `reason` (String, optional)
* `priority` (String: Low / Medium / High)
* `estimatedBudget` (Number, optional)

---

## 🌐 Routes & Pages

Use the same pattern as the Movie app.

### 1️⃣ List all destinations

* **GET** `/destinations`
* Shows all saved destinations
* Destination name should be clickable

---

### 2️⃣ Add new destination form

* **GET** `/destinations/new`
* Form fields:

  * name
  * country
  * reason
  * priority (dropdown)
  * estimated budget (number)

---

### 3️⃣ Create destination

* **POST** `/destinations`
* Saves destination to MongoDB
* Redirects to `/destinations`

---

### 4️⃣ Destination details page

* **GET** `/destinations/:id`
* Shows full destination details, including budget

---

## 🧠 Technical Requirements

* Use **controllers** for logic
* Keep **routes thin** (URL → controller)
* Use **EJS** for all views
* One model only
* Clean folder structure

---

## ✅ Evaluation (Lightweight)

* App runs without errors
* Destinations can be created and listed
* Details page loads the correct destination
* Controllers contain the logic (not routes)

---

## ⭐ Optional Stretch (Pick ONE)

Choose only one extra feature if you finish early:

* Sort destinations by `estimatedBudget`
* Filter by `priority`
* Add a label like “Budget is an estimate” on the details page

---

## 💡 Tip

If you’re stuck, compare the structure to the Movie app:

* Replace **Movie** with **Destination**
* Keep the same folder design and flow

Overthinking usually means you’re adding features you don’t need.
