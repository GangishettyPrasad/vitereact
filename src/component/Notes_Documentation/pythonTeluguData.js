// src/component/Notes_Documentation/pythonTeluguData.js

export const PYTHON_TELUGU_DATA = [
  {
    id: "intro",
    title: "1. Python Introduction (పైథాన్ పరిచయం)",
    description: "Python basics introduction, dynamic features, compilation, and hello world scripts.",
    imageUrl: "/python_beginner_flow.png",
    telugu: "Python anedhi chala simple and dynamic language. Semicolons checks brackets lekapovadam valla chadavadaniki, code rayadaniki chala clear ga untundhi. Guido van Rossum deenni 1991 lo develop chesaru.",
    what: "Python anedhi oka high-level, dynamic, and easy-to-understand programming language. Guido van Rossum ane aayana 1991 lo deenni create chesaru.",
    why: "Python chaala simple ga untundhi. Semicolons ; or brackets {} lekapovadam valla syntax chala readable ga untundhi.",
    how: "Python code interpreter (.pyc bytecode) compiler convert chesi execute chesthundhi.",
    rules: "Indentation and spacing are mandatory rules in Python structure flow.",
    where: "FastAPI web services, machine learning engines, database analytics dashboards.",
    examples: {
      low: {
        prereq: "System typing and basic terminal commands awareness.",
        code: `# LOW DIFFICULTY: Basic print command
print("Hello World!")
print("Welcome to Python Telugu Tutorial!")`,
        filename: "hello_basic.py",
        explanation: [
          "print(...) - screen meedha text display cheyyadaniki standard built-in function.",
          "Quotes '' or \"\" specify that the input data is a text string value."
        ]
      },
      medium: {
        prereq: "Arithmetic operators and variable assignment basics.",
        code: `# MEDIUM DIFFICULTY: Calculating total salary with dynamic values
basic_pay = 25000
allowance = 4500
gross_salary = basic_pay + allowance
print("Your Gross Salary is:", gross_salary)`,
        filename: "salary_calc.py",
        explanation: [
          "basic_pay = 25000 - creates a memory object and binds the name basic_pay.",
          "gross_salary = basic_pay + allowance - adds the values using arithmetic + operator.",
          "print('Your Gross Salary is:', gross_salary) - outputs text followed by calculated variable value."
        ]
      },
      high: {
        prereq: "Python time library modules import understanding.",
        code: `# HIGH DIFFICULTY: Measuring program execution time dynamically
import time

start_mark = time.time()
# Simulate printing greetings
print("Processing enterprise system startup...")
time.sleep(0.5) # pauses execution for 0.5 seconds
end_mark = time.time()

duration = end_mark - start_mark
print(f"Server Startup Duration: {round(duration, 4)} seconds")`,
        filename: "time_audit.py",
        explanation: [
          "import time - loads the Python system library to access time functions.",
          "time.time() - fetches the current timestamp in seconds.",
          "time.sleep(0.5) - pauses execution to simulate delay in background tasks.",
          "print(f'...') - formats variables directly inside the string using f-string syntax."
        ]
      }
    }
  },
  {
    id: "variables",
    title: "2. Variables & Memory (వేరియబుల్స్ & మెమరీ)",
    description: "How variables are represented in heap memory space as reference pointers.",
    imageUrl: "/python_variables_memory.png",
    telugu: "Python lo variables standard box templates kaadhu. Vi variables memory addresses stack pointer references construct chesthundi dynamic heap allocation objects target pointers construct parameters checks details.",
    what: "Variables are reference pointers in the stack frame pointing to objects allocated in the heap memory.",
    why: "Used to track and modify values dynamically as the program runs.",
    how: "Variable assignments use the equals (=) operator without specifying data types.",
    rules: "Must start with letters or underscores. Cannot contain spaces or numbers at the start.",
    where: "Storing database credentials, calculating salaries, tracking login sessions.",
    examples: {
      low: {
        prereq: "Variables assignment basics.",
        code: `# LOW DIFFICULTY: Variable updates and outputs
employee_id = 1045
employee_name = "Prasad"

print(employee_id)
print(employee_name)`,
        filename: "variables_basic.py",
        explanation: [
          "employee_id = 1045 - creates an integer object 1045 on the Heap, variable points to it.",
          "employee_name = 'Prasad' - stores string reference Prasad."
        ]
      },
      medium: {
        prereq: "Reassignment and variable swapping concepts.",
        code: `# MEDIUM DIFFICULTY: Swapping two variables values
x = 100
y = 200

print(f"Before swap: x={x}, y={y}")
# Pythonic way to swap variables
x, y = y, x

print(f"After swap: x={x}, y={y}")`,
        filename: "swap_variables.py",
        explanation: [
          "x, y = y, x - tuple unpacking method. Python evaluates right side first (y, x), then assigns values back."
        ]
      },
      high: {
        prereq: "Object copy references, mutable vs immutable concept, id() function.",
        code: `# HIGH DIFFICULTY: Deep Copy vs Shallow Copy references in heap
import copy

# Original nested list (mutable)
original_list = [[1, 2], [3, 4]]
shallow_list = copy.copy(original_list)
deep_list = copy.deepcopy(original_list)

# Mutate nested item
original_list[0][0] = 999

print("Original:", original_list)
# Shallow copy reflects the change because inner lists share same reference IDs!
print("Shallow Copy:", shallow_list) 
# Deep copy remains unchanged because it recursively copied all objects!
print("Deep Copy:", deep_list)`,
        filename: "copy_references.py",
        explanation: [
          "copy.copy() - shallow copy copies top-level references, nested lists still point to same heap ID.",
          "copy.deepcopy() - copies all nested items recursively to new memory addresses.",
          "original_list[0][0] = 999 - mutates shared nested array value."
        ]
      }
    }
  },
  {
    id: "datatypes",
    title: "3. Data Types & Casts (డేటా టైప్స్ & కాస్టింగ్)",
    description: "Numeric types, floats, decimals, casting rules, and precision management.",
    imageUrl: "/python_beginner_flow.png",
    telugu: "Python strongly dynamic typings language data variables standard formats configurations checks casting logic integer data string data conversion rules.",
    what: "Strongly-typed numeric, text, and logical classifications. Type casting converts one type to another.",
    why: "Required to convert input strings to numbers for calculations and handle monetary precision.",
    how: "Use casting functions int(), float(), str() to convert datatypes manually.",
    rules: "String must be numeric to cast to int/float; else throws ValueError.",
    where: "Parsing form inputs, database queries response formatting, financial tax bounds.",
    examples: {
      low: {
        prereq: "Inputs and outputs understanding.",
        code: `# LOW DIFFICULTY: Basic casting
numeric_str = "500"
converted_int = int(numeric_str)
print(converted_int + 100) # Output: 600`,
        filename: "casting_basic.py",
        explanation: [
          "int(numeric_str) - parses string digits to integer datatype.",
          "+ 100 - standard addition math."
        ]
      },
      medium: {
        prereq: "Handling input validation exceptions.",
        code: `# MEDIUM DIFFICULTY: Safe user input casting wrapper
def safe_cast_to_int(value_str):
    try:
        return int(value_str)
    except ValueError:
        print(f"Warning: '{value_str}' cannot be cast to integer! Returning fallback 0.")
        return 0

print(safe_cast_to_int("450"))
print(safe_cast_to_int("InvalidNumber"))`,
        filename: "safe_cast.py",
        explanation: [
          "try/except ValueError - traps invalid casting inputs without crashing application."
        ]
      },
      high: {
        prereq: "Floating-point precision limits and decimal library modules.",
        code: `# HIGH DIFFICULTY: Decimal precision calculation for financial records
from decimal import Decimal

# Float approximation error
float_sum = 0.1 + 0.2
print("Float Sum (Binary float error):", float_sum) # 0.30000000000000004

# Decimal exact precision
decimal_sum = Decimal("0.1") + Decimal("0.2")
print("Decimal Sum (Exact math representation):", decimal_sum) # 0.3`,
        filename: "decimal_precision.py",
        explanation: [
          "Decimal(...) - initializes exact base-10 numeric objects.",
          "Always pass strings to Decimal constructor to prevent binary approximations errors."
        ]
      }
    }
  },
  {
    id: "conditionals",
    title: "4. Control Flow (కండిషనల్స్)",
    description: "Decision making using if, elif, else, and pattern matching match-case statements.",
    imageUrl: "/python_conditionals_flow.png",
    telugu: "Control Flow programming logic conditions based routes selections execution flow check. if, elif, else dynamic loops flow validation systems.",
    what: "If-else blocks evaluate conditions to run specific blocks of code conditionally.",
    why: "Enables decision mapping: e.g. checking user roles, verifying input limits, or setting discount rates.",
    how: "Use boolean operators and indentation blocks. Match-case supports pattern matching.",
    rules: "Spaces (indentation) are mandatory. Colon (:) ends condition declarations.",
    where: "Role access verification, API input routing, tax calculation ranges.",
    examples: {
      low: {
        prereq: "Comparison operators knowledge.",
        code: `# LOW DIFFICULTY: Basic check
marks = 75
if marks >= 35:
    print("Result: Pass")
else:
    print("Result: Fail")`,
        filename: "conditionals_basic.py",
        explanation: [
          "if marks >= 35 - checks if marks is greater than or equal to 35.",
          "else - executes if the condition evaluates to False."
        ]
      },
      medium: {
        prereq: "Nested conditionals and logical operators.",
        code: `# MEDIUM DIFFICULTY: Password strength check
def check_password_strength(password):
    if len(password) < 8:
        return "Weak: Short password"
    else:
        # Check special characters or numbers presence
        if any(char.isdigit() for char in password):
            return "Strong password"
        return "Medium strength: Add numbers"

print(check_password_strength("pwd123"))
print(check_password_strength("longpasswordwithoutdigits"))`,
        filename: "pwd_strength.py",
        explanation: [
          "any(char.isdigit() ...) - checks if at least one character in password is a number.",
          "Returns different messages based on nested condition paths."
        ]
      },
      high: {
        prereq: "Python 3.10 match-case syntax and dynamic data shapes.",
        code: `# HIGH DIFFICULTY: Match-Case API command router
def route_api_command(request_packet):
    # Structural Pattern Matching
    match request_packet:
        case {"command": "login", "user": username, "password": _}:
            return f"Processing authentication route for {username}."
        case {"command": "get_profile", "user_id": uid}:
            return f"Fetching employee profile records for ID: {uid}."
        case _:
            return "Error 400: Malformed Request packet."

print(route_api_command({"command": "login", "user": "Prasad", "password": "secure"}))
print(route_api_command({"command": "invalid"}))`,
        filename: "api_router.py",
        explanation: [
          "match request_packet - matches dictionaries based on keys and bindings.",
          "case {'command': 'login', ...} - maps matching structure, extracts user value to username."
        ]
      }
    }
  },
  {
    id: "loops",
    title: "5. Loops (లూప్స్)",
    description: "Repeated executions using for and while structures, break, and continue.",
    imageUrl: "/python_loops_flow.png",
    telugu: "Loops and iterate calculations operations dynamic repetitions handles checks. for loop data collection parsing and while conditional iteration bounds.",
    what: "Loops repeat execution of a code block based on elements in a sequence or dynamic variables.",
    why: "Used to iterate over database rows, dispatch emails, or check authentication status limits.",
    how: "for loops iterate lists, while loops run as long as condition remains True.",
    rules: "Update variables in while loop to prevent infinite runs.",
    where: "Batch processing entries, streaming files, printing database reports.",
    examples: {
      low: {
        prereq: "Loops syntax.",
        code: `# LOW DIFFICULTY: Basic loop
for i in range(1, 6):
    print("Count number:", i)`,
        filename: "loops_basic.py",
        explanation: [
          "range(1, 6) - generates sequence 1, 2, 3, 4, 5.",
          "for i in ... - loops through each value."
        ]
      },
      medium: {
        prereq: "Break, continue, and loop-else statements.",
        code: `# MEDIUM DIFFICULTY: Searching employee record using loop-else
employees = ["Ramesh", "Sita", "Venkat", "Hari"]
search_target = "Venkat"

for name in employees:
    if name == search_target:
        print(f"Found employee: {name}!")
        break
else:
    # Runs ONLY if the loop completed without hitting 'break'
    print("Employee record not found in database.")`,
        filename: "loop_search.py",
        explanation: [
          "break - terminates loop immediately.",
          "else block - executes only if loop finishes naturally without breaking."
        ]
      },
      high: {
        prereq: "Nested loops and math optimization checks.",
        code: `# HIGH DIFFICULTY: Generating Prime Numbers using nested loops
def generate_primes(limit):
    primes = []
    for num in range(2, limit + 1):
        # Math optimization: search up to square root of num
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                break
        else:
            primes.append(num)
    return primes

print("Prime numbers up to 50:", generate_primes(50))`,
        filename: "primes_generator.py",
        explanation: [
          "num ** 0.5 - calculates square root for loop boundary optimization.",
          "Nested loop checks factors; inner break skips non-primes; outer else appends primes."
        ]
      }
    }
  },
  {
    id: "functions",
    title: "6. Functions (ఫంక్షన్స్)",
    description: "Reusability blocks, arguments packing, defaults, and custom decorators.",
    imageUrl: "/python_beginner_flow.png",
    telugu: "Functions named reusable segments defined parameters check. decorators custom logs wrappers execute functionality filters blocks.",
    what: "Functions are named reusable blocks of code defined once, accepting parameters and returning processed values.",
    why: "Eliminates duplicate code by centralizing business algorithms.",
    how: "Use 'def' keyword, list parameters, and 'return' values.",
    rules: "Variables defined inside function are local; cannot be read outside.",
    where: "Calculators, database write abstractions, middleware authentication wrappers.",
    examples: {
      low: {
        prereq: "Functions basics.",
        code: `# LOW DIFFICULTY: Basic function
def add_bonus(salary, bonus):
    return salary + bonus

print(add_bonus(50000, 500))`,
        filename: "functions_basic.py",
        explanation: [
          "def add_bonus(...) - defines function parameters.",
          "return - passes output back to caller."
        ]
      },
      medium: {
        prereq: "Variable length packing: args and kwargs.",
        code: `# MEDIUM DIFFICULTY: Dynamic allowance calculations using *args
def calculate_allowances(basic, *allowances):
    total = basic
    for amt in allowances:
        total += amt
    return total

print("Salary + 3 Allowances:", calculate_allowances(45000, 1500, 2000, 800))`,
        filename: "allowance_args.py",
        explanation: [
          "*allowances - packs any extra numbers passed to function into a tuple."
        ]
      },
      high: {
        prereq: "Decorators concept, first-class functions, inner wrappers.",
        code: `# HIGH DIFFICULTY: API Authentication Decorator
def require_admin_role(func):
    def wrapper(user_profile, *args, **kwargs):
        if user_profile.get("role") != "Admin":
            raise PermissionError("Access Denied: Admin privileges required.")
        return func(user_profile, *args, **kwargs)
    return wrapper

@require_admin_role
def delete_database_record(user_profile, record_id):
    return f"Successfully deleted record ID: {record_id}."

# Test Execution
admin_user = {"name": "Prasad", "role": "Admin"}
staff_user = {"name": "Kalyan", "role": "Staff"}

try:
    print(delete_database_record(admin_user, 908))
    print(delete_database_record(staff_user, 908)) # will crash
except PermissionError as e:
    print("Security Block:", e)`,
        filename: "auth_decorator.py",
        explanation: [
          "@require_admin_role - wraps function inside decorator check.",
          "wrapper - intercepts call, checks user role, forwards or blocks execution."
        ]
      }
    }
  },
  {
    id: "collections",
    title: "7. Collections (లిస్ట్‌లు, టూపుల్స్, డిక్షనరీలు & సెట్స్)",
    description: "In-depth review of List, Tuple, Dictionary, and Set collections with performance comparisons.",
    imageUrl: "/python_beginner_flow.png",
    telugu: "Collections group objects store configurations. Lists ordered updates, Tuples read-only constraints, Dictionaries key lookups speeds.",
    what: "Containers to store data groups. Mutability, ordering, and lookups dictate performance profiles.",
    why: "Used to manage multiple entries, filter redundancies, and map API responses.",
    how: "Declare via brackets, run index checks, append or delete items.",
    rules: "Sets automatically filter duplicates. Dictionary keys must be hashable.",
    where: "Result lists, profile lookups, tracking unique inputs.",
    examples: {
      low: {
        prereq: "Collections syntax.",
        code: `# LOW DIFFICULTY: List operations
employee_names = ["Alice", "Bob"]
employee_names.append("Charlie")
print("First Name:", employee_names[0])`,
        filename: "list_basic.py",
        explanation: [
          "append(...) - adds item to end of list.",
          "[0] - accesses first element (0-indexed)."
        ]
      },
      medium: {
        prereq: "Set operations and removing duplicates.",
        code: `# MEDIUM DIFFICULTY: Filter unique departments
raw_entries = ["HR", "IT", "HR", "Sales", "IT"]
unique_depts = set(raw_entries)
print("Unique list:", list(unique_depts))`,
        filename: "set_filter.py",
        explanation: [
          "set(raw_entries) - removes duplicates because sets contain unique items."
        ]
      },
      high: {
        prereq: "Dictionary mapping, key-value lookup speeds.",
        code: `# HIGH DIFFICULTY: Fast O(1) database mapper using Dictionaries
def build_employee_index(employee_list):
    # Maps ID directly to profile for O(1) search
    return {emp["id"]: emp for emp in employee_list}

db_rows = [
    {"id": 101, "name": "Alice", "role": "Lead"},
    {"id": 102, "name": "Bob", "role": "Dev"}
]

index = build_employee_index(db_rows)
# Fetch Bob instantly without searching the whole list
print("Bob Profile Lookup:", index[102])`,
        filename: "dict_lookup.py",
        explanation: [
          "index = {...} - dictionary comprehension maps id key to profile value.",
          "index[102] - constant time lookup."
        ]
      }
    }
  },
  {
    id: "oop",
    title: "8. Object-Oriented Programming (ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్)",
    description: "OOP blueprints, constructors, inheritance, and properties.",
    imageUrl: "/python_variables_memory.png",
    telugu: "OOP programming structural paradigm classes objects encapsulation setups code design concepts validations standard procedures.",
    what: "Paradigm using Classes (blueprints) and Objects (instances) to structure data.",
    why: "Encapsulates data, inherits base attributes, and supports polymorphous implementations.",
    how: "Use 'class' keyword, instantiate objects via variables parameters.",
    rules: "Access private fields only via public properties getters.",
    where: "ORM database tables, system components, user profile modules.",
    examples: {
      low: {
        prereq: "OOP syntax.",
        code: `# LOW DIFFICULTY: Basic Class
class Employee:
    def __init__(self, name):
        self.name = name

emp = Employee("Srinivas")
print(emp.name)`,
        filename: "oop_basic.py",
        explanation: [
          "__init__ - constructor to initialize object attributes.",
          "emp = Employee(...) - instantiates class."
        ]
      },
      medium: {
        prereq: "Class Inheritance.",
        code: `# MEDIUM DIFFICULTY: Class inheritance
class Staff:
    def get_type(self):
        return "Staff Member"

class Manager(Staff):
    # Overrides parent method
    def get_type(self):
        return "Manager Level"

mgr = Manager()
print(mgr.get_type())`,
        filename: "oop_inheritance.py",
        explanation: [
          "class Manager(Staff) - inherits from Staff base class."
        ]
      },
      high: {
        prereq: "Encapsulation, property getters, setters, and validation decorators.",
        code: `# HIGH DIFFICULTY: Encapsulated class with property validation
class PayrollProfile:
    def __init__(self, name, basic_pay):
        self.name = name
        self.__pay = basic_pay # Encapsulated private field

    @property
    def pay(self):
        return self.__pay

    @pay.setter
    def pay(self, amount):
        if amount <= 0:
            raise ValueError("Salary must be positive amount.")
        self.__pay = amount

# Execution
profile = PayrollProfile("Kalyan", 45000)
profile.pay = 50000 # Works!
try:
    profile.pay = -100 # Crashes validation
except ValueError as e:
    print("Invalid action rejected:", e)`,
        filename: "oop_property.py",
        explanation: [
          "@property - decorator wraps pay getter function.",
          "@pay.setter - validates values before updating database records."
        ]
      }
    }
  },
  {
    id: "exceptions",
    title: "9. Exception Handling (ఎక్సెప్షన్ హ్యాండ్లింగ్)",
    description: "Error checking try-except blocks and user exceptions.",
    imageUrl: "/python_beginner_flow.png",
    telugu: "Exception Handling runtime crashes error prevention triggers checks try except block safe operations.",
    what: "Mechanism to capture runtime errors preventing system crash failures.",
    why: "Maintains API uptime by catching exceptions and returning error codes.",
    how: "Use try, except, else, and finally keywords blocks.",
    rules: "Release handles (database/files) inside the finally block.",
    where: "Database writes, file transfers, network API connectors.",
    examples: {
      low: {
        prereq: "Exception syntax.",
        code: `# LOW DIFFICULTY: Division error check
try:
    print(10 / 0)
except ZeroDivisionError:
    print("Caught division by zero!")`,
        filename: "exceptions_basic.py",
        explanation: [
          "except ZeroDivisionError - handles zero division without crashing program."
        ]
      },
      medium: {
        prereq: "Multiple except clauses and finally blocks.",
        code: `# MEDIUM DIFFICULTY: Dictionary key parsing with exception handling
def get_user_field(data_dict, key):
    try:
        val = data_dict[key]
        return val
    except KeyError:
        print(f"Warning: Key '{key}' not found in profile.")
        return None
    finally:
        print("Completed database column read operation.")

profile = {"name": "Hari"}
print(get_user_field(profile, "age"))`,
        filename: "exceptions_dict.py",
        explanation: [
          "KeyError - caught when accessing non-existent key in dictionary.",
          "finally - executes regardless of outcomes."
        ]
      },
      high: {
        prereq: "Creating custom exceptions, inheritance from Exception base class.",
        code: `# HIGH DIFFICULTY: Custom Business Logic Exception
class InsufficientLeavesError(Exception):
    def __init__(self, balance, requested):
        self.balance = balance
        self.requested = requested
        super().__init__(f"Request failed: Requested {requested} leaves but balance is {balance}.")

def apply_leaves(balance, requested):
    if requested > balance:
        raise InsufficientLeavesError(balance, requested)
    return "Leave Approved Successfully."

try:
    print(apply_leaves(12, 15))
except InsufficientLeavesError as e:
    print("HRMS Rule Validation Error:", e)`,
        filename: "custom_exception.py",
        explanation: [
          "class InsufficientLeavesError(Exception) - defines custom exception class.",
          "raise - triggers exception on business rule violations."
        ]
      }
    }
  },
  {
    id: "files",
    title: "10. File Handling (ఫైల్ హ్యాండ్లింగ్)",
    description: "Reading and writing files dynamically.",
    imageUrl: "/python_beginner_flow.png",
    telugu: "File Handling external storage file operations reading writing text config JSON inputs standard setups.",
    what: "Reading from and writing files on system disk drive.",
    why: "Used to load configuration settings, parse upload logs, or write export sheets.",
    how: "Use open() or context managers 'with open()' declarations.",
    rules: "Always use context manager to prevent locking system file handles.",
    where: "Bulk upload directories, export processes, logging files.",
    examples: {
      low: {
        prereq: "File operations syntax.",
        code: `# LOW DIFFICULTY: Basic write to file
with open("test.txt", "w") as file:
    file.write("Hello World from Python File!")`,
        filename: "file_write_basic.py",
        explanation: [
          "with open(...) - opens test.txt in write ('w') mode, closes automatically."
        ]
      },
      medium: {
        prereq: "Reading lines, stripping content.",
        code: `# MEDIUM DIFFICULTY: Reading text file line-by-line
with open("test.txt", "r") as file:
    for line in file:
        print("File Content line:", line.strip())`,
        filename: "file_read_lines.py",
        explanation: [
          "line.strip() - removes trailing newlines or whitespace characters."
        ]
      },
      high: {
        prereq: "JSON file operations and dictionary serialization.",
        code: `# HIGH DIFFICULTY: Read and Write JSON configuration files
import json

system_config = {"db_host": "localhost", "port": 5432}

# Write JSON
with open("config.json", "w") as f:
    json.dump(system_config, f, indent=4)

# Read JSON
with open("config.json", "r") as f:
    loaded_config = json.load(f)
    print("Database port:", loaded_config["port"])`,
        filename: "json_handling.py",
        explanation: [
          "json.dump - serializes python dictionary into JSON file.",
          "json.load - parses JSON file back to python dictionary."
        ]
      }
    }
  },
  {
    id: "database",
    title: "11. Database & APIs (డేటాబేస్ & FastAPI)",
    description: "Introduction to database queries, schemas, and API routers.",
    imageUrl: "/python_conditionals_flow.png",
    telugu: "FastAPI modern framework asynchronous route endpoints setups database integrations parameters checks schema validation structures.",
    what: "Permanent data storage databases connected to FastAPI router handlers.",
    why: "Necessary to store users, process requests, and query data profiles dynamically.",
    how: "Write FastAPI async paths, validate inputs via Pydantic model configurations.",
    rules: "Define clear APIRouters, validate fields, handle database exceptions.",
    where: "Main core web backend API layers.",
    examples: {
      low: {
        prereq: "FastAPI basic setup.",
        code: `# LOW DIFFICULTY: Basic FastAPI startup
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "Online"}`,
        filename: "fastapi_basic.py",
        explanation: [
          "@app.get('/') - registers GET endpoint at root path."
        ]
      },
      medium: {
        prereq: "Pydantic BaseModel schema validations.",
        code: `# MEDIUM DIFFICULTY: FastAPI route with Pydantic validation
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class EmployeeProfile(BaseModel):
    name: str
    age: int

@app.post("/api/employees")
async def create_profile(profile: EmployeeProfile):
    return {"message": f"Verified profile for {profile.name}."}`,
        filename: "fastapi_pydantic.py",
        explanation: [
          "class EmployeeProfile(BaseModel) - validates incoming JSON keys."
        ]
      },
      high: {
        prereq: "Asynchronous database mock, dependency injection framework.",
        code: `# HIGH DIFFICULTY: Async SQLite CRUD API Mock
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class TaskItem(BaseModel):
    task_name: str
    status: str

# Mock Database connection dependency
async def get_db():
    db = {"connection_status": "Ready"}
    yield db

db_tasks = []

@app.post("/api/tasks", status_code=201)
async def add_task(task: TaskItem, db=Depends(get_db)):
    if not task.task_name:
        raise HTTPException(status_code=400, detail="Task name cannot be empty.")
    db_tasks.append(task.dict())
    return {"status": "success", "count": len(db_tasks)}

@app.get("/api/tasks", response_model=List[dict])
async def list_tasks():
    return db_tasks`,
        filename: "fastapi_crud_db.py",
        explanation: [
          "Depends(get_db) - injects active database connection into routing endpoint.",
          "HTTPException - returns custom status codes on failures."
        ]
      }
    }
  }
];
