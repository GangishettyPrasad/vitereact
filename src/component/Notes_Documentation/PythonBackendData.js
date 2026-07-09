// src/component/Notes_Documentation/PythonBackendData.js

export const PYTHON_BACKEND_DATA = [
  {
    id: 1,
    title: "Part 1: Python Introduction",
    topics: [
      {
        id: "intro-what",
        name: "What is Python & Why Use It?",
        description: "An absolute introduction to Python, its history, features, and comparative analysis.",
        what: "Python is a high-level, interpreted, dynamic, and object-oriented programming language designed by Guido van Rossum in 1991. It emphasizes code readability and simplicity.",
        why: "We use Python because it reduces development time. Its syntax is close to English, it has a massive ecosystem of libraries (FastAPI, NumPy, Pandas), and it is supported by all major platforms.",
        when: "Use Python when you need to build scalable backend APIs (using FastAPI/Django), machine learning models, automation scripts, or data processing pipelines quickly.",
        internal: "Python compiles source code (.py) into intermediate bytecode (.pyc), which is then executed by the Python Virtual Machine (PVM). It uses dynamic typing and automated garbage collection (Reference Counting + Generational GC).",
        syntax: `# Simple Python script
def greet_employee(name: str) -> str:
    return f"Welcome {name} to HRMS Portal!"

print(greet_employee("Prasad"))`,
        flowDiagram: `+-----------------------------------------+
|           Python Source Code            |
|                 (.py)                   |
+-----------------------------------------+
                     |
                     v  (Compilation Phase)
+-----------------------------------------+
|            Python Bytecode              |
|                 (.pyc)                  |
+-----------------------------------------+
                     |
                     v  (Execution Phase)
+-----------------------------------------+
|         Python Virtual Machine          |
|                 (PVM)                   |
+-----------------------------------------+
                     |
                     v
+-----------------------------------------+
|             Machine Code                |
+-----------------------------------------+`,
        english: "Python is designed for clean readability. It abstracts memory management, static typing overhead, and system-level configurations, allowing developers to focus strictly on business logic.",
        telugu: "Python chala simple language. Deeni syntax English laane untundi. Garbage Collection automatic ga jarigipotundi kabatti, memory compile time configurations gurinchi manam burra baddalu kottukovalsina pani ledu. FastAPI or Django tho backend APIs build cheyyadaniki deenni chaala use chestaru.",
        analogy: "Think of Python like an Automatic Transmission Car. You don't need to manually change gears (manage memory/types); you just steer and accelerate (write business logic).",
        hrms: "In an HRMS, we use Python to write microservices that calculate employee experience, process onboarding workflows, and trigger background welcome emails.",
        payroll: "In Payroll, Python handles the complex calculation algorithms for tax deductions, PF calculations, and payslip generation in background tasks.",
        beginner: "For beginners, Python means no semi-colons, no complex braces, and easy readability. It lets you learn programming logic without syntax frustration.",
        advanced: "For advanced developers, Python provides powerful features like decorators, generators, metaclasses, and asynchronous coroutines (`asyncio`) for highly concurrent applications.",
        code: `import time

# Simulation of a heavy background payroll verification process
def verify_employee_records(employees: list) -> dict:
    start_time = time.time()
    verified_count = 0
    for emp in employees:
        if emp.get("status") == "Active" and emp.get("pan_verified"):
            verified_count += 1
    execution_time = time.time() - start_time
    return {
        "status": "Success",
        "verified_count": verified_count,
        "execution_time_seconds": round(execution_time, 4)
    }

# Mock data
emp_database = [
    {"name": "Alice", "status": "Active", "pan_verified": True},
    {"name": "Bob", "status": "Active", "pan_verified": False},
    {"name": "Charlie", "status": "Inactive", "pan_verified": True}
]

print(verify_employee_records(emp_database))`,
        codeFilename: "verify_records.py",
        bestPractices: [
          "Always follow PEP 8 styling guidelines.",
          "Use type hinting to make your code self-documenting and prevent runtime type mismatches.",
          "Keep libraries updated to ensure security and performance patches are applied."
        ],
        commonMistakes: [
          "Confusing Python 2.x and Python 3.x syntaxes.",
          "Not understanding that Python uses dynamic typing, leading to sudden runtime TypeErrors.",
          "Overlooking the Global Interpreter Lock (GIL) when designing CPU-bound multithreaded systems."
        ],
        performanceTips: [
          "Use built-in functions written in C (like map, filter, sorted) which run much faster.",
          "Use list comprehensions instead of raw for-loops for simple mappings.",
          "For CPU-heavy code, use multiprocessing instead of threading to bypass the GIL."
        ],
        interviews: [
          {
            q: "What is the difference between an interpreted language like Python and a compiled language like C++?",
            a: "Compiled languages translate source code directly to machine code before execution, running faster but requiring compilation. Python is compiled to bytecode first and then interpreted by the PVM line-by-line, which offers platform independence and easier debugging at the expense of pure execution speed."
          },
          {
            q: "Explain what PVM (Python Virtual Machine) is.",
            a: "PVM is the runtime engine of Python. It is an interpreter that takes bytecode instructions (.pyc files), translates them to machine code, and executes them on the system."
          }
        ],
        challenge: {
          desc: "Write a comparison function that takes two employee profile dictionaries and checks if all personal identifiers match.",
          reqs: ["Ensure type hints are used.", "Handle missing keys gracefully.", "Print execution details."]
        },
        miniProject: {
          desc: "Command-line Employee Profile Manager",
          steps: [
            "Initialize an empty list for employees.",
            "Implement a CLI loop offering options: Add Employee, View Employees, Exit.",
            "Add validation to check if the Employee ID is unique."
          ]
        },
        summary: "Python is an interpreted, high-level language focusing on developer productivity. It translates code to bytecode (.pyc) and executes it on the PVM, making it highly versatile for backend APIs, scripting, and data operations."
      }
    ]
  },
  {
    id: 3,
    title: "Part 3: Python Basics & Operators",
    topics: [
      {
        id: "basics-vars",
        name: "Python Variables & Memory Model",
        description: "Learn how variables work in Python, dynamic referencing, memory allocation, and naming rules from absolute beginner to pro.",
        what: "A variable in Python is a named label or reference pointer that points to an object stored in system memory (Heap). Unlike C++ or Java, variables in Python do not hold the actual values directly; they store the memory address of the object.",
        why: "We use variables to store and manipulate data dynamically. If we calculate an employee's salary or store their name, we need a reference pointer (variable) to retrieve or update that value as code runs.",
        when: "Every time you need to store temporary state, fetch data from a database, parse client input, or perform calculations.",
        internal: "When you assign 'x = 500', Python creates an Integer Object with value 500 in the private Heap memory space. Variable 'x' is allocated on the Stack frame, containing only the memory address (reference) of that Heap object. If you do 'y = x', y points to the exact same memory address. Dynamic memory cleanup is managed automatically by counting the references pointing to each heap object.",
        syntax: `# 1. Creating Variables (No type declaration required)
employee_id = 1045
employee_name = "Prasad Gangishetty"
base_salary = 95000.00
is_active_user = True

# 2. Re-assigning variables dynamically
salary = 95000.00   # Float type
salary = "Ninety-Five Thousand" # Dynamically changed to String type (Dynamic Typing)`,
        flowDiagram: `STACK FRAME (References)                  HEAP MEMORY (Actual Objects)
+------------------------+                +----------------------------------+
|   employee_id   ------>|--------------->| [Type: Int]  [Value: 1045]       |
+------------------------+                +----------------------------------+
|   employee_name ------>|--------------->| [Type: Str]  [Value: "Prasad"]   |
+------------------------+                +----------------------------------+
|   base_salary   ------>|--------------->| [Type: Float][Value: 95000.00]   |
+------------------------+                +----------------------------------+`,
        english: "Variables are dynamic reference names. Python uses type inference to determine the variable type at runtime. Names must follow snake_case convention, starting with a letter or underscore, and are case-sensitive. Memory allocation occurs on the heap, and variables on the stack store references to these heap objects.",
        telugu: "Python lo Variables ante values ni direct ga store cheskune dynamic boxes kaadhu. Dynamic reference pointers! Mana RAM heap memory lo actual values store aithai, variable name stack area lo aa value unna memory address ni point chesthundhi. Naming rules: variable name starts only with letters or underscore (ex: employee_id). Spacing undakudadhu, case-sensitive (ex: salary and Salary veru-veru variables). Types run-time lo script automatic ga catch chesthundhi.",
        analogy: "Think of a variable like a Labeled String tied to a Balloon. The balloon is the actual object (with data like '1045' or 'Prasad') floating in Heap Memory. The string is the variable name you hold. If you cut the string, the balloon floats away and is cleaned up by the garbage collector.",
        hrms: "In an HRMS application, variables hold database connection URLs, active employee sessions, total leave balances, and user permission groups during request validation.",
        payroll: "In Payroll calculations, variables store HRA percentage, professional tax bounds, and deduction structures to dynamically compute the net pay.",
        beginner: "For beginners: Think of a variable as a sticky note with a name written on it. You stick it onto a value so you can find and use it later in your code. You can move the note to a different value at any time.",
        advanced: "For Pro levels: Python uses a system called 'Id' and 'Reference Counting'. The built-in id() function returns the unique memory address of the object. Mutating a mutable object (like a list) keeps the same id(), but reassigning a variable to a new immutable object (like integer or string) creates a new object in memory with a completely different id().",
        code: `# Dynamic Referencing and ID Verification
def demonstrate_memory_model():
    # 1. Assignment
    first_salary = 85000.00
    second_salary = first_salary
    
    print(f"first_salary Value: {first_salary} | Memory Address: {id(first_salary)}")
    print(f"second_salary Value: {second_salary} | Memory Address: {id(second_salary)}")
    # Both point to the exact same memory ID!
    
    print("\\n--- Modifying value (Reassignment) ---")
    first_salary = 90000.00
    print(f"After change, first_salary: {first_salary} | Memory Address: {id(first_salary)}")
    print(f"After change, second_salary: {second_salary} | Memory Address: {id(second_salary)}")
    # first_salary now points to a new Float object in memory, while second_salary still points to the old one.

demonstrate_memory_model()`,
        codeFilename: "variable_memory.py",
        bestPractices: [
          "Always use descriptive names using snake_case (e.g., net_salary, check_in_time).",
          "Use capital letters for Constants that should not change (e.g., TAX_RATE = 0.18).",
          "Always use type hinting to help IDEs catch type errors early (e.g., age: int = 25)."
        ],
        commonMistakes: [
          "Starting variable names with numbers (e.g., 1_employee = 'Prasad'), which causes a SyntaxError.",
          "Using spaces in variable names (e.g., gross salary = 50000).",
          "Forgetting that variables are case-sensitive, creating duplicates (e.g., TaxRate and taxrate are different)."
        ],
        performanceTips: [
          "Avoid excessive global variables; local variables in functions access memory much faster.",
          "Use tuple unpacking for multiple assignments in a single line (e.g., x, y = 10, 20) to reduce bytecode instructions.",
          "For large strings or objects, reuse references instead of instantiating new duplicate strings."
        ],
        interviews: [
          {
            q: "Are variables in Python pass-by-value or pass-by-reference?",
            a: "Python uses 'Pass-by-Object-Reference' (also called pass-by-assignment). If you pass a mutable object (like a list) to a function, modifications inside the function affect the original object. If you pass an immutable object (like an integer), the function receives a copy of the reference, and reassigning it inside the function doesn't affect the caller's variable."
          },
          {
            q: "What does id() function return in Python?",
            a: "id() returns the identity of an object. This is an integer which is guaranteed to be unique and constant for this object during its lifetime. In CPython, this is the actual memory address of the object."
          }
        ],
        challenge: {
          desc: "Create three variables (name, age, salary), check their memory addresses using id(), then update the salary and verify if the address has changed.",
          reqs: ["Must print memory addresses before and after update.", "State whether the datatype is mutable or immutable."]
        },
        miniProject: {
          desc: "HRMS Session Cache Mock",
          steps: [
            "Write a script that stores session attributes (username, token, login_time).",
            "Simulate token expiration by reassigning the token variable to None.",
            "Display memory address logs for each operation."
          ]
        },
        summary: "Variables are reference pointers on the stack pointing to objects on the heap. They are dynamically typed, follow snake_case naming rules, and undergo automatic garbage collection when reference counts reach zero."
      },
      {
        id: "basics-types",
        name: "Python Data Types & Casting",
        description: "Understand basic datatypes: Int, Float, String, Boolean, None, and how type casting works under the hood.",
        what: "Data types classify variables, telling the compiler or interpreter how the programmer intends to use the data. Type casting is the process of converting a variable from one data type to another (e.g. converting a string '500' to an integer 500).",
        why: "We receive data from APIs or user inputs as strings. To perform math calculations (like payroll deductions), we must convert those strings into floats or integers. Similarly, to format outputs, we cast numbers back to strings.",
        when: "Whenever you read data from external systems (database, file, input forms) or output formatted strings to logs or API responses.",
        internal: "Python is strongly typed, meaning it will not implicitly convert mismatched types (e.g. adding a string to an integer throws a TypeError). Explicit casting functions like int(), float(), and str() invoke the respective constructor methods (__int__, __float__, __str__) on the target object class to instantiate a new object of the desired type.",
        syntax: `# 1. Common Data Types
emp_id = 4501                     # Integer
hourly_rate = 120.50              # Float
emp_name = "Kiran Kalyan"         # String
is_manager = False                # Boolean
leave_reason = None               # NoneType (Represents absence of value)

# 2. Type Casting Examples
input_days = "22"                 # Received as String
worked_days = int(input_days)     # Cast to Integer for calculations
payment_receipt = str(hourly_rate)# Cast float to String for concatenations`,
        flowDiagram: `Client Input ("22") ---> [String Object] ---> int() Constructor ---> [New Int Object (22)]
                                                                               |
                                                                               v
                                                                     Math: 22 * 1500.00`,
        english: "Python has several built-in datatypes. Numeric types are immutable. Type casting can be implicit (handled automatically by interpreter like float + int = float) or explicit (manually declared like int('50')).",
        telugu: "Python strong-typed language, ante string ni integer ni direct ga add chesthe software error isthundhi. Input values systems nundi direct ga string ga vasthayi. Vaatini explicit ga cast cheyyali (ex: int('22') or float('150.50')). Implicit casting ante automatic ga data type target convert avthundi (ex: 5 + 2.0 returns 7.0 float).",
        analogy: "Think of type casting like translating languages. A French word ('50') must be translated into English digits (50) before an English accountant can add it to the ledger.",
        hrms: "In an HRMS system, form fields return user inputs as strings. We cast the active employee age to int, and salary inputs to float before writing validation queries.",
        payroll: "In Payroll, calculations on bank details, PAN inputs (strings) and gross payouts (float/decimal) require explicit casting to prevent decimal precision errors.",
        beginner: "Always verify inputs. If you try to cast a non-numeric string like 'hello' to an integer using int(), Python will throw a ValueError.",
        advanced: "For floating point calculations, python floats can suffer from binary approximation bugs (e.g., 0.1 + 0.2 equals 0.30000000000000004). In enterprise payroll systems, we import the 'Decimal' module from 'decimal' library for exact precision currency calculations.",
        code: `# Explicit Type Casting and Precision Check
from decimal import Decimal

def process_salary_input(input_salary_str: str, bonus_str: str):
    try:
        # Cast inputs to float safely
        base = float(input_salary_str)
        bonus = float(bonus_str)
        gross = base + bonus
        print(f"[FLOAT] Gross: {gross} (Standard float calculation)")
        
        # High precision calculation for financial records
        dec_base = Decimal(input_salary_str)
        dec_bonus = Decimal(bonus_str)
        dec_gross = dec_base + dec_bonus
        print(f"[DECIMAL] Gross: {dec_gross} (High precision currency calculation)")
        
    except ValueError as e:
        print(f"Error casting values: {e}")

process_salary_input("75000.10", "150.20")`,
        codeFilename: "casting_precision.py",
        bestPractices: [
          "Always wrap explicit type casting operations in try-except blocks to catch ValueError.",
          "Use Decimal instead of Float for processing financial and currency values in backend calculations.",
          "Use 'None' as default value parameters when a variable might have no value assigned yet."
        ],
        commonMistakes: [
          "Assuming float values are exact, leading to rounding discrepancies in salary sums.",
          "Trying to convert a string with decimals (e.g. '120.50') directly to int() without casting to float first.",
          "Attempting to concatenate a string and a number without casting the number to str()."
        ],
        performanceTips: [
          "Decimal calculations are slower than float operations because they are processed in software rather than CPU hardware. Use Float for general math and Decimal only for financial transactions.",
          "Use list mapping functions for bulk casting operations.",
          "Perform casting at the boundary (e.g. API input layer) so business logic does not repeat conversion operations."
        ],
        interviews: [
          {
            q: "What is the difference between float and Decimal in Python?",
            a: "Float uses binary floating-point representation (base 2), which is fast but suffers from rounding limits. Decimal uses decimal floating-point representation (base 10), which is slower but exact, making it mandatory for financial calculations."
          },
          {
            q: "How does Python handle implicit type conversion?",
            a: "Python converts data types automatically only when there is no risk of data loss. For example, adding an integer to a float automatically promotes the integer to a float (e.g., 5 + 1.5 = 6.5)."
          }
        ],
        challenge: {
          desc: "Write a function that receives user inputs for basic pay, professional tax, and PF contribution as strings. Cast them safely, calculate net pay, and output the result as a string.",
          reqs: ["Use try-except blocks.", "Output must match currency format '$XX.XX'."]
        },
        miniProject: {
          desc: "HRMS Bulk Attendance Cast",
          steps: [
            "Create a list of strings representing raw check-in hours (e.g., ['8.5', '9.0', 'Invalid', '8.0']).",
            "Write a script that filters out invalid entries, casts valid ones to floats, and calculates total hours worked."
          ]
        },
        summary: "Python has standard numeric, string, boolean, and null data types. Strongly typed rules require explicit type casting to prevent TypeErrors, using floats for general metrics and Decimals for financial calculations."
      }
    ]
  }
];
