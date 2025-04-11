# 🌟 Git & GitHub Full Workflow Guide with Telugu Explanation & Screenshots

---

## 1️⃣ GitHub Repository Creation

🔹 **Step 1**: Go to [https://github.com](https://github.com) → Click on `+` → New Repository  
🔹 **Step 2**: Give a name like `vitereact` → Add description → Keep it public/private → Click on `Create Repository`

📷 *Screenshot: GitHub new repo creation page*

👉 **Telugu Explanation**:
```telugu
GitHub లో కొత్త repository create చేయాలంటే పై స్టెప్స్ follow చేయాలి. ఇది మన project ని GitHub లోనూ manage చేయడానికి ఉపయోగపడుతుంది.
```

---

## 2️⃣ Clone Repository to Your Local System

```bash
git clone https://github.com/username/repo-name.git
```

📷 *Screenshot: GitHub clone URL*

👉 **Telugu Explanation**:
```telugu
ఈ command తో GitHub లో ఉన్న project ని మన local computer కి తీసుకోవచ్చు.
```

---

## 3️⃣ Create & Switch to New Branch

```bash
git checkout -b branch_name
```

Eg: `git checkout -b prasadlatest11`

📷 *Screenshot: Terminal creating new branch*

👉 **Telugu Explanation**:
```telugu
కొత్త feature కోసం కొత్త branch తీసుకుంటాం. దీని వల్ల main code కు ఎలాంటి disturbance ఉండదు.
```

---

## 4️⃣ Daily Work Steps

1. `git status`
2. `git add .`
3. `git commit -m "your message"`
4. `git push --set-upstream origin branch_name` *(only first time)*
5. From next time → just `git push`

📷 *Screenshot: Git terminal showing status → add → commit → push*

👉 **Telugu Explanation**:
```telugu
ప్రతి రోజు మన changes ని git లో add చేసి GitHub కి పంపాలంటే ఈ steps follow చేయాలి.
```

---

## 5️⃣ How to Merge Branch into Main (Pull Request)

🔸 Go to GitHub → Click `Compare & Pull Request`  
🔸 Add a title & description  
🔸 Click `Create Pull Request`  
🔸 Click `Merge Pull Request`

📷 *Screenshot: GitHub pull request page and merge button*

👉 **Telugu Explanation**:
```telugu
మన branch లో చేసిన changes main లోకి రావాలంటే Pull Request create చేసి GitHub లో merge చేయాలి.
```

---

## 6️⃣ Handling Merge Conflicts

### ✅ In VS Code

- VS Code లో conflict ఉన్న files open అవుతాయి
- `<<<<<<<`, `=======`, `>>>>>>>` sections కనిపిస్తాయి
- మీ code merge చేసి unwanted lines తీసేయండి
- Save → then:

```bash
git add .
git commit -m "resolved conflict"
git push
```

📷 *Screenshot: Conflict lines in VS Code editor*

👉 **Telugu Explanation**:
```telugu
రెండు branches లో ఒకే file లో changes ఉన్నప్పుడు conflict వస్తుంది. మనం ఏ changes కావాలో merge చేసి commit చేయాలి.
```

---

### ✅ In GitHub

- Pull Request page లో "Resolve conflicts" button కనిపిస్తుంది  
- UI లో changes merge చేసి → "Mark as resolved" → Commit merge

📷 *Screenshot: GitHub conflict resolution UI*

---

## 7️⃣ Track Remote Branches

```bash
git branch -r
```

---

## 8️⃣ Switching Between Branches

```bash
git checkout branch_name
```

👉 **Telugu Summary**:
```telugu
- ప్రతి feature కోసం కొత్త branch తీసుకోండి
- changes commit చేసి push చేయండి
- GitHub లో pull request create చేసి merge చేయండి
- conflict వచ్చినప్పుడు resolve చేసి push చేయండి
```

---

## ✅ Final Best Practices

- ✅ Always keep your `main` branch clean  
- 🚫 Do not work directly on `main`  
- 🔁 Take a new branch for every task/feature  
- 📥 Before new work, pull latest main:
```bash
git pull origin main
```

📷 *Optional: Final workflow diagram image here*
