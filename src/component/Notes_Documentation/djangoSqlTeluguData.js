// src/component/Notes_Documentation/djangoSqlTeluguData.js

export const DJANGO_SQL_TELUGU_DATA = [
  {
    id: "sql-crud",
    title: "1. SQL Intro & CRUD (డేటాబేస్ & క్రడ్ ఆపరేషన్స్)",
    description: "Database table create, insert, select, update, delete commands in easy spoken Telugu.",
    imageUrl: "/sql_joins_diagram.png",
    telugu: "SQL anedhi database thoti matladadaniki use chese language. Database lo tables form lo records save cheyyadaniki, select query thoti data fetch cheyyadaniki, modify and delete operations cheyyadaniki SQL CRUD use chestham.",
    what: "SQL (Structured Query Language) anedhi Relational Databases (SQLite, PostgreSQL) lo data store operations perform cheyyadaniki use chese standard language.",
    why: "HRMS application employee data permanently store cheskovadaniki and query cheyyadaniki database mandatory.",
    how: "CREATE TABLE commands thoti schema build chesi, INSERT through records push chesi read loops running path standard syntax.",
    rules: "Prathi table column data types clear ga select cheyyali, query end lo semicolon (;) specify cheyyali.",
    where: "Employee registration profile, salary slip logging systems database writes.",
    examples: {
      low: {
        prereq: "Basic databases tables tabular rows concept.",
        code: `-- LOW DIFFICULTY: Creating table and inserting row
CREATE TABLE employee (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50)
);

INSERT INTO employee (emp_id, name, department) 
VALUES (1, 'Prasad', 'Engineering');`,
        filename: "create_insert.sql",
        explanation: [
          "CREATE TABLE employee (...) - database table configuration mapping.",
          "emp_id INT PRIMARY KEY - declares unique ID column.",
          "INSERT INTO - writes a fresh record row inside employee table."
        ]
      },
      medium: {
        prereq: "Where clause filters, update and delete checks.",
        code: `-- MEDIUM DIFFICULTY: Fetching and updating entries with filters
SELECT emp_id, name, department 
FROM employee 
WHERE department = 'Engineering';

UPDATE employee 
SET department = 'Research' 
WHERE emp_id = 1;`,
        filename: "select_update.sql",
        explanation: [
          "WHERE department = 'Engineering' - filters rows matching search criteria.",
          "UPDATE employee SET ... - modifies database entry columns dynamically."
        ]
      },
      high: {
        prereq: "Aggregations, group-by filters, and subqueries.",
        code: `-- HIGH DIFFICULTY: Nested subquery filters
SELECT name, department, salary 
FROM employee_salary
WHERE salary > (
    SELECT AVG(salary) FROM employee_salary
);`,
        filename: "subquery_filter.sql",
        explanation: [
          "SELECT AVG(salary) - subquery calculates average salary across all employees.",
          "WHERE salary > (...) - filters workers earning more than the calculated average."
        ]
      }
    }
  },
  {
    id: "sql-joins",
    title: "2. SQL Joins & Keys (టేబుల్ జాయిన్స్ & ఫారిన్ కీస్)",
    description: "Venn diagrams, Inner joins, Left/Right joins, and connecting tables in Telugu.",
    imageUrl: "/sql_joins_diagram.png",
    telugu: "SQL Joins multiple tables ni primary check matching IDs based key connections calculations combine chesthayi. Venn diagram matching overlapping circular logic thoti query result mapping control outhundhi.",
    what: "Foreign Keys directly parent tables primary keys refer chesthayi, Joins data layers merge chesthundi.",
    why: "Personal info database tabular columns and salary slips details separate logs data join output query processing pipeline structure dynamically.",
    how: "INNER JOIN, LEFT JOIN, RIGHT JOIN clauses ON key comparisons matching standard format parameters.",
    rules: "Matching ID datatype elements standard identical bounds align verification.",
    where: "Reporting department details mapped inside profiles listings.",
    examples: {
      low: {
        prereq: "Multiple tables link concepts.",
        code: `-- LOW DIFFICULTY: Simple Inner Join between employee and department
SELECT employee.name, department.dept_name
FROM employee
INNER JOIN department ON employee.dept_id = department.id;`,
        filename: "inner_join.sql",
        explanation: [
          "INNER JOIN - extracts rows that have matching values in both tables.",
          "ON employee.dept_id = department.id - matches parent-child key columns."
        ]
      },
      medium: {
        prereq: "Left join vs right join details.",
        code: `-- MEDIUM DIFFICULTY: Left Join to fetch all employees even if they don't have department
SELECT employee.name, department.dept_name
FROM employee
LEFT JOIN department ON employee.dept_id = department.id;`,
        filename: "left_join.sql",
        explanation: [
          "LEFT JOIN - extracts all records from left table, matching right records (or NULL if unmatched)."
        ]
      },
      high: {
        prereq: "Multiple tables chaining joins, alias filters.",
        code: `-- HIGH DIFFICULTY: Chaining 3 tables joins (Employee, Salary, attendance)
SELECT e.name, s.basic_pay, a.total_present_days
FROM employee e
INNER JOIN salary_slip s ON e.emp_id = s.emp_id
LEFT JOIN attendance_summary a ON e.emp_id = a.emp_id
WHERE s.payment_status = 'Processed';`,
        filename: "chain_joins.sql",
        explanation: [
          "INNER JOIN followed by LEFT JOIN - connects three database tables sequentially.",
          "e, s, a - table alias prefixes simplifying query readability."
        ]
      }
    }
  },
  {
    id: "sql-transactions",
    title: "3. SQL Transactions & Indexes (లావాదేవీలు & ఇండెక్సింగ్)",
    description: "Database performance indexing techniques and transactional safety controls (Commit, Rollback).",
    imageUrl: "/sql_joins_diagram.png",
    telugu: "Transactions multiple DB modifications safe group sequence handle cheyyadaniki, performance index scans lookups query acceleration execution levels target optimization structure.",
    what: "BEGIN, COMMIT, ROLLBACK execution boundary safety, Indexes query speed accelerate lookups.",
    why: "Database connection writes rollback error prevention triggers, millions table records quick access filters dynamic indexes speeds.",
    how: "CREATE INDEX syntax speed filters, nested updates inside begin block check commit saves.",
    rules: "Excess indexes write operations slow speed constraints, transactional rollback clears updates dynamically.",
    where: "Payroll balance deduction security check logging modules data query checks.",
    examples: {
      low: {
        prereq: "Transaction basics.",
        code: `-- LOW DIFFICULTY: Basic commit sequence
BEGIN TRANSACTION;
UPDATE account SET balance = balance - 1000 WHERE user_id = 1;
UPDATE account SET balance = balance + 1000 WHERE user_id = 2;
COMMIT;`,
        filename: "transaction_commit.sql",
        explanation: [
          "BEGIN TRANSACTION - initiates logical write session.",
          "COMMIT - commits and saves changes permanently to disk."
        ]
      },
      medium: {
        prereq: "Rollback handlers and error triggers.",
        code: `-- MEDIUM DIFFICULTY: Rollback transaction on data mismatch simulation
BEGIN TRANSACTION;
UPDATE account SET balance = balance - 1000 WHERE user_id = 1;
-- Simulation: something crashes, database triggers rollback
ROLLBACK;`,
        filename: "transaction_rollback.sql",
        explanation: [
          "ROLLBACK - cancels all queries executed since BEGIN, restoring old data states."
        ]
      },
      high: {
        prereq: "Index creation, B-Tree index structure operations.",
        code: `-- HIGH DIFFICULTY: Query speed optimization via Indexes
CREATE INDEX idx_employee_email ON employee (email_address);

-- Accelerated search query running O(log N) instead of O(N) linear scans
SELECT emp_id, name FROM employee WHERE email_address = 'prasad@company.com';`,
        filename: "indexes.sql",
        explanation: [
          "CREATE INDEX idx_... - creates a search lookup tree (B-Tree) on specified column.",
          "Speeds up lookups on millions of rows from seconds to milliseconds."
        ]
      }
    }
  },
  {
    id: "sql-aggregation",
    title: "4. SQL Grouping & Windows (డేటా గ్రూపింగ్ & విండో ఫంక్షన్స్)",
    description: "Aggregate functions, GROUP BY having filters, and advanced SQL Window functions.",
    imageUrl: "/sql_joins_diagram.png",
    telugu: "SQL Aggregation group calculations math sums compute chesthayi. Windows partition structures rows collapse cheyyakunda relative rank logs generation dynamic execution handle capabilities.",
    what: "SUM, AVG, COUNT, OVER partition parameters SQL metrics configurations.",
    why: "Department wise payroll salaries calculation dashboards report structures aggregations details calculations.",
    how: "GROUP BY columns filters, OVER(PARTITION BY ...) window loops computations standard formats.",
    rules: "Aggregated columns group criteria bounds check select criteria fields matches rules.",
    where: "Sales statistics summary, employee performance rank logging profiles analytics.",
    examples: {
      low: {
        prereq: "Basic SQL queries.",
        code: `-- LOW DIFFICULTY: Basic aggregation SUM and AVG
SELECT SUM(basic_pay) as total_payroll, AVG(basic_pay) as avg_salary 
FROM employee_salary;`,
        filename: "basic_agg.sql",
        explanation: [
          "SUM(basic_pay) - sums up all payouts in the table.",
          "AVG(basic_pay) - computes average salary of employees."
        ]
      },
      medium: {
        prereq: "Group by with aggregate calculations.",
        code: `-- MEDIUM DIFFICULTY: Grouping salaries by department with filters
SELECT department, SUM(basic_pay) as dept_total, COUNT(emp_id) as total_employees
FROM employee_salary
GROUP BY department
HAVING COUNT(emp_id) >= 5;`,
        filename: "group_by_having.sql",
        explanation: [
          "GROUP BY department - groups results by department column.",
          "HAVING COUNT(emp_id) >= 5 - filters out departments with fewer than 5 employees."
        ]
      },
      high: {
        prereq: "Advanced Window Functions, OVER, and PARTITION BY.",
        code: `-- HIGH DIFFICULTY: Ranking employee salaries inside each department
SELECT name, department, salary,
       ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) as salary_rank
FROM employee_salary;`,
        filename: "window_function.sql",
        explanation: [
          "OVER(PARTITION BY department ...) - initiates window function grouping by department.",
          "ROW_NUMBER() - assigns sequential ranks to employees based on salary within their department."
        ]
      }
    }
  },
  {
    id: "django-intro",
    title: "5. Django Intro & MVT (డిజాంగో పరిచయం & ఎమ్.వి.టి)",
    description: "Django MTV (Model-Template-View) framework structure, project initialization, uvicorn/gunicorn setup.",
    imageUrl: "/django_rest_flow.png",
    telugu: "Django web framework Python backend API development simplified packages, MTV (Model-Template-View) execution standard pipeline.",
    what: "Python backend framework handles database routing, request controls dynamically.",
    why: "Pre-configured Django admin site, authentication tables, ORM features reduce server setup timelines.",
    how: "django-admin cli tools initialization project path settings configure.",
    rules: "Indentation and settings variables registrations imports configurations syntax rules.",
    where: "Main backends backend routers, web application servers configurations endpoints.",
    examples: {
      low: {
        prereq: "Virtualenv and pip command lines.",
        code: `# LOW DIFFICULTY: Installing and initializing Django project
pip install django
django-admin startproject my_company_project
cd my_company_project
python manage.py runserver`,
        filename: "django_init.sh",
        explanation: [
          "django-admin startproject ... - creates standard folder structures.",
          "python manage.py runserver - boots local development server."
        ]
      },
      medium: {
        prereq: "Django MTV routing and project settings configurations.",
        code: `# MEDIUM DIFFICULTY: Defining basic view in views.py and mapping URL
# my_app/views.py
from django.http import JsonResponse

def welcome_api(request):
    return JsonResponse({"message": "Welcome to Django Telugu Portal!"})

# my_company_project/urls.py
from django.urls import path
from my_app.views import welcome_api

urlpatterns = [
    path('api/welcome/', welcome_api),
]`,
        filename: "basic_view_routing.py",
        explanation: [
          "JsonResponse(...) - converts python dictionary to JSON format output.",
          "path(...) - maps targeted API route path to views function handler."
        ]
      },
      high: {
        prereq: "Middleware architectures, custom request processing.",
        code: `# HIGH DIFFICULTY: Custom Middleware auditing request times
import time

class APILoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start = time.time()
        # Process request
        response = self.get_response(request)
        duration = time.time() - start
        
        # Log stats
        print(f"[AUDIT LOG] Path: {request.path} | Time: {round(duration, 4)}s")
        return response`,
        filename: "middleware.py",
        explanation: [
          "APILoggingMiddleware - catches requests at entry, calculates execution time, forwards responses."
        ]
      }
    }
  },
  {
    id: "django-models",
    title: "6. Django Models & ORM (డిజాంగో మోడల్స్ & ఒ.ఆర్.ఎమ్)",
    description: "Database table mapping using Django models class, advanced ORM query filters, annotations, and N+1 optimizations.",
    imageUrl: "/django_rest_flow.png",
    telugu: "Django ORM (Object-Relational Mapper) SQL queries rayakunda custom python classes fields definitions database tables create schema synchronizations perform speed operations.",
    what: "Models class properties SQL column mappings, ORM QuerySets database operations wrappers.",
    why: "Simplifies insertions database transactions safety queries loops reduction parameters.",
    how: "python queries model objects, migrate models class setup to SQLite structures.",
    rules: "Avoid loops queries (N+1 performance issue), select_related prefetch parameters must be defined.",
    where: "Employee profiles schemas definitions, DB mappings tables sync configurations.",
    examples: {
      low: {
        prereq: "OOP classes concept.",
        code: `# LOW DIFFICULTY: Basic model definition and ORM insertion
from django.db import models

class Department(models.Model):
    dept_name = models.CharField(max_length=50)

# Inserting record using Python ORM
new_dept = Department(dept_name="Engineering")
new_dept.save()`,
        filename: "models_orm_basic.py",
        explanation: [
          "models.Model - base class mapping python object to SQL table structure.",
          "new_dept.save() - saves the Python object as a new row in SQL database."
        ]
      },
      medium: {
        prereq: "Database migrations procedures and basic filtering.",
        code: `# MEDIUM DIFFICULTY: Django ORM filters, exclusions and lookups
# Fetch all employees in Engineering department
eng_staff = Employee.objects.filter(department__dept_name="Engineering")

# Fetch all employees EXCEPT managers
non_managers = Employee.objects.exclude(designation="Manager")`,
        filename: "orm_filters.py",
        explanation: [
          "filter(department__dept_name=...) - double underscore (__) queries related table columns (joins).",
          "exclude(...) - returns database rows that do NOT match specified conditions."
        ]
      },
      high: {
        prereq: "Advanced Aggregation, F-expressions, and select_related optimizations.",
        code: `# HIGH DIFFICULTY: Advanced aggregation and F expressions to check salary mismatch
from django.db.models import F, Avg, Max
from my_app.models import Employee

# 1. select_related optimization to solve N+1 query loop
staff = Employee.objects.select_related('department').all()

# 2. F-expression comparing two fields in database directly
underpaid = Employee.objects.filter(salary__lt=F('department__minimum_budget'))

# 3. Aggregations (Average salary of all employees)
average_sal = Employee.objects.aggregate(avg_pay=Avg('salary'))
print(f"Global Average Payout: {average_sal['avg_pay']}")`,
        filename: "orm_pro_queries.py",
        explanation: [
          "select_related('department') - cache-loads foreign key records in a single SQL JOIN query, preventing N+1 loop calls.",
          "F('department__minimum_budget') - reference database columns directly in filter checks without loading them into memory.",
          "aggregate(avg_pay=Avg('salary')) - executes mathematical averages directly on database server."
        ]
      }
    }
  },
  {
    id: "django-signals",
    title: "7. Django Signals (డిజాంగో సిగ్నల్స్)",
    description: "Creating automatic triggers and observers during database save operations.",
    imageUrl: "/django_rest_flow.png",
    telugu: "Django Signals component actions notification triggers, dynamic observers log logic post/pre data saves automated routing system.",
    what: "Sender-receiver observers structure executing workflows conditionally.",
    why: "User authentication credentials registrations auto templates creation for Employee logs.",
    how: "Django receiver decorator post_save model links connection setups.",
    rules: "Avoid infinite loops save loops, define signal ready methods inside apps configurations.",
    where: "Authentication User registration tables hooks, security tracking logging systems.",
    examples: {
      low: {
        prereq: "Basic Python functions and decorators.",
        code: `# LOW DIFFICULTY: Simple console log signal observer
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def log_user_creation(sender, instance, created, **kwargs):
    if created:
        print(f"Log Alert: Fresh User account created for {instance.username}")`,
        filename: "simple_signal.py",
        explanation: [
          "@receiver(post_save ...) - binds functions to run automatically right after a User database record is saved."
        ]
      },
      medium: {
        prereq: "Django model relationship assignments.",
        code: `# MEDIUM DIFFICULTY: Auto-creating Employee Profile on User Registration
# models.py
class EmployeeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    designation = models.CharField(max_length=50, default="Intern")

# signals.py
@receiver(post_save, sender=User)
def create_employee_profile(sender, instance, created, **kwargs):
    if created:
        EmployeeProfile.objects.create(user=instance)`,
        filename: "profile_signal.py",
        explanation: [
          "EmployeeProfile.objects.create(...) - instantiates a profile row referencing the new User ID automatically."
        ]
      },
      high: {
        prereq: "Signal dispatcher overrides, performance transaction locks.",
        code: `# HIGH DIFFICULTY: Custom signal dispatcher with transaction security check
from django.dispatch import Signal, receiver

# 1. Define custom event signal
payroll_processed = Signal()

# 2. Trigger signal dispatch
# payroll_processed.send(sender=None, slip_id=402, amount=85000.0)

# 3. Receiver capturing custom audit parameters
@receiver(payroll_processed)
def audit_payroll_event(sender, **kwargs):
    slip_id = kwargs.get("slip_id")
    amount = kwargs.get("amount")
    print(f"[PAYROLL AUDIT] Logged processing for Slip #{slip_id}. Gross: \${amount}")`,
        filename: "custom_signals.py",
        explanation: [
          "Signal() - instantiates custom trigger event.",
          "payroll_processed.send(...) - dispatches custom signal payload to all active receivers."
        ]
      }
    }
  },
  {
    id: "django-drf",
    title: "8. Django REST Framework (డిజాంగో రెస్ట్ ఫ్రేమ్‌వర్క్)",
    description: "Django REST Framework (DRF) setup, Serializers, API views, and RESTful API endpoints.",
    imageUrl: "/django_rest_flow.png",
    telugu: "Django REST Framework (DRF) Python objects data serializers JSON API conversion standards web communication channels configure frameworks.",
    what: "DRF Serializers input schema validations JSON responses handlers.",
    why: "Frontend SPA integration (React/Angular) JSON formats exchange validation standards backend handlers.",
    how: "ModelViewSet abstractions URLs routing maps endpoints.",
    rules: "Validations errors responses formatting standard HTTP states parameters.",
    where: "Exposing React frontend connection tables REST data ports API endpoints.",
    examples: {
      low: {
        prereq: "FastAPI or Django models basics.",
        code: `# LOW DIFFICULTY: Basic Serializer class
from rest_framework import serializers

class DeptSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    dept_name = serializers.CharField(max_length=50)`,
        filename: "serializers_basic.py",
        explanation: [
          "serializers.Serializer - validates and serializes custom class structures."
        ]
      },
      medium: {
        prereq: "ModelSerializer, ModelViewSet shortcuts.",
        code: `# MEDIUM DIFFICULTY: ModelSerializer and ModelViewSet shortcuts
from rest_framework import serializers, viewsets
from my_app.models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'dept_name', 'created_at']

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer`,
        filename: "drf_viewsets.py",
        explanation: [
          "ModelSerializer - auto maps model fields to serializer schema fields.",
          "ModelViewSet - auto generates CRUD paths (GET, POST, PUT, DELETE) dynamically."
        ]
      },
      high: {
        prereq: "APIView customization, custom validation overrides.",
        code: `# HIGH DIFFICULTY: Custom APIView with manual validation overrides
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CustomPayrollAPI(APIView):
    def post(self, request):
        amount = request.data.get("amount", 0)
        
        # Manual custom validation
        if amount <= 0:
            return Response(
                {"error": "Deductions amount must be positive."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        return Response({"status": "Success", "payout": amount}, status=status.HTTP_201_CREATED)`,
        filename: "custom_apiview.py",
        explanation: [
          "APIView - offers full control over GET, POST methods.",
          "Response(..., status) - DRF custom response returning exact HTTP status codes."
        ]
      }
    }
  },
  {
    id: "django-celery",
    title: "9. Celery & Redis Tasks (సెలేరీ & రెడిస్ బ్యాక్‌గ్రౌండ్ టాస్క్స్)",
    description: "Asynchronous background processing, tasks queues, and celery-beat cron scheduling.",
    imageUrl: "/django_rest_flow.png",
    what: "Celery anedhi heavy tasks queue process checker broker Redis middleware links processing.",
    why: "Slow bulk mailers operations backend async executions server CPU performance optimizations.",
    how: "Configure shared tasks decorators delayed triggers setups.",
    telugu: "Celery async task runner engine background workers processing tasks queues systems. Redis broker load management details routing process automation rules.",
    rules: "Worker service instance online status tracking configuration parameters.",
    where: "Monthly payroll bulk slips creations PDF dispatch tasks loops scheduling.",
    examples: {
      low: {
        prereq: "Basic Python functions and decorators.",
        code: `# LOW DIFFICULTY: Basic Celery task configuration
from celery import shared_task

@shared_task
def send_simple_welcome_email(email_address):
    # Simulate sending email
    print(f"Success: Dispatching welcome email to: {email_address}")
    return "Email Sent"`,
        filename: "celery_basic.py",
        explanation: [
          "@shared_task - registers function to be queued and executed asynchronously by external worker threads."
        ]
      },
      medium: {
        prereq: "Broker configurations and tasks trigger delay methods.",
        code: `# MEDIUM DIFFICULTY: Triggering background tasks from views
# views.py
from django.http import JsonResponse
from .tasks import send_simple_welcome_email

def register_user_api(request):
    email = request.GET.get('email')
    
    # Trigger background task asynchronously
    # delay() queues the task in Redis instantly and continues execution without blocking!
    send_simple_welcome_email.delay(email)
    
    return JsonResponse({"status": "Queued", "message": "Verification mail queued."})`,
        filename: "trigger_task.py",
        explanation: [
          "send_simple_welcome_email.delay(...) - pushes the task execution load to Redis queue, returning immediately."
        ]
      },
      high: {
        prereq: "Celery-beat schedule setups, cron patterns.",
        code: `# HIGH DIFFICULTY: Scheduling recurring Payroll runs at midnight
# celery.py inside Django project
from celery import Celery
from celery.schedules import crontab

app = Celery('my_company_project')

# Cron Schedule setup
app.conf.beat_schedule = {
    'run-payroll-first-of-month': {
        'task': 'payroll.tasks.process_monthly_payroll_job',
        # Executes at exactly 00:00 (Midnight) on the 1st of every month
        'schedule': crontab(day_of_month=1, hour=0, minute=0),
    },
}`,
        filename: "celery_cron.py",
        explanation: [
          "crontab(day_of_month=1 ...) - schedules recurring background cron job using standard UNIX cron notations."
        ]
      }
    }
  },
  {
    id: "django-cors-env",
    title: "10. CORS & Env Setup (కోర్స్ & ఎన్విరాన్మెంట్ సెటప్)",
    description: "Configuring environment variable (.env) protection, and django-cors-headers permissions configs in Telugu.",
    imageUrl: "/django_rest_flow.png",
    telugu: "CORS (Cross-Origin Resource Sharing) browser domain security parameters. Environment variable files security credentials variables hide standard methods.",
    what: "dotenv secrets safety configurations CORS allowed access domains listings configs.",
    why: "Frontend client SPA APIs network requests server blocking resolution parameters.",
    how: "python-dotenv libraries integration CORS middleware settings arrays registrations.",
    rules: "Wildcard * access avoid rules in CORS configurations production setups.",
    where: "Production deployment parameters secrets logging parameters integrations.",
    examples: {
      low: {
        prereq: "Basic Python OS variables.",
        code: `# LOW DIFFICULTY: Basic .env definition and loading key using os module
# 1. Create a local file named '.env'
# DATABASE_PASSWORD=supersecret_pass_123

# 2. Python loading logic
import os
from dotenv import load_dotenv

load_dotenv() # Load variables from .env file
db_pass = os.environ.get("DATABASE_PASSWORD")
print("Database password loaded:", db_pass is not None)`,
        filename: "load_env.py",
        explanation: [
          "load_dotenv() - loads the variables defined inside the local .env file into os.environ.",
          "os.environ.get(...) - retrieves variable values safely, returning None if missing."
        ]
      },
      medium: {
        prereq: "django-cors-headers configuration details.",
        code: `# MEDIUM DIFFICULTY: settings.py CORS configurations middleware
# 1. Install using pip: pip install django-cors-headers

# 2. settings.py adjustments
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Placed at top
    # ...
]

# Allow React local development port to make API calls
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
]`,
        filename: "cors_settings.py",
        explanation: [
          "CorsMiddleware - interceptor that injects appropriate CORS response headers.",
          "CORS_ALLOWED_ORIGINS - whitelists specific frontend domains to allow communication."
        ]
      },
      high: {
        prereq: "django-environ module setups, settings.py structural overrides.",
        code: `# HIGH DIFFICULTY: Production settings.py with django-environ database URL parsing
import environ
import os

env = environ.Env(
    # Set default values and types
    DEBUG=(bool, False)
)

# Read .env file
environ.Env.read_env()

# Load values dynamically
SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')

# Parse SQL Database URL connection string directly
DATABASES = {
    'default': env.db('DATABASE_URL', default='sqlite:///db.sqlite3')
}`,
        filename: "prod_settings.py",
        explanation: [
          "environ.Env(...) - initializes casting environment config reader.",
          "env.db(...) - parses complex connection strings (e.g. 'postgres://user:pass@host:port/db') directly into Django database configs format."
        ]
      }
    }
  },
  {
    id: "django-migrations-adv",
    title: "11. Migrations & Schema Sync (డేటాబేస్ మైగ్రేషన్స్ & వర్షనింగ్)",
    description: "Database model migrations versioning, handling default values, and custom data migrations in Telugu.",
    imageUrl: "/django_rest_flow.png",
    telugu: "Django database migrations versioning control. Schema columns additions alterations trace migrations scripts updates auto queries generation.",
    what: "makemigrations commands Python model modification tracking tools schema sync systems.",
    why: "Modify active database schemas without data loss historical records constraints.",
    how: "migrations.RunPython scripts custom calculations database upgrades setups.",
    rules: "Null default values parameters checks on pre-existing table columns setup migrations.",
    where: "Databases table schemas alterations migrations workflow pipelines.",
    examples: {
      low: {
        prereq: "Basic model definitions.",
        code: `# LOW DIFFICULTY: Model modification and basic migration
# 1. Update model class in models.py
class Employee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(null=True) # New field added

# 2. Run schema commands in terminal
# python manage.py makemigrations
# python manage.py migrate`,
        filename: "migration_basic.py",
        explanation: [
          "null=True - makes field optional, preventing database constraints errors on existing rows that lack email data."
        ]
      },
      medium: {
        prereq: "Handling default value prompt parameters on non-nullable fields.",
        code: `# MEDIUM DIFFICULTY: Adding non-nullable field with default values to active model
from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    # Adding field with default value prevents migrate command from crashing on existing rows!
    status = models.CharField(max_length=20, default="Active")`,
        filename: "migration_default.py",
        explanation: [
          "default='Active' - tells database to populate all pre-existing rows with 'Active' automatically during migration run."
        ]
      },
      high: {
        prereq: "Custom data migration scripts, RunPython migrations API.",
        code: `# HIGH DIFFICULTY: Writing a custom data migration to populate default values
from django.db import migrations

def populate_default_experience(apps, schema_editor):
    # Fetch model class dynamically
    Employee = apps.get_model('my_app', 'Employee')
    for emp in Employee.objects.all():
        if emp.years_of_experience is None:
            emp.years_of_experience = 0
            emp.save()

class Migration(migrations.Migration):
    dependencies = [
        ('my_app', '0002_add_experience_field'), # previous migration
    ]

    operations = [
        # Executes custom Python script during migration run!
        migrations.RunPython(populate_default_experience),
    ]`,
        filename: "data_migration.py",
        explanation: [
          "migrations.RunPython(...) - executes custom Python database script within the migrations flow.",
          "apps.get_model(...) - retrieves model classes safely from historical app registries."
        ]
      }
    }
  },
  {
    id: "django-deployment",
    title: "12. Production Deployment (లోకల్ నుండి సర్వర్ డిప్లాయ్మెంట్)",
    description: "Django static files, Docker containerization, Gunicorn application servers, and Nginx reverse proxy.",
    imageUrl: "/django_rest_flow.png",
    telugu: "Production deployment processes local code server VPS target environments setup dynamic containers handling Nginx proxy setup details.",
    what: "Gunicorn WSGI web runtime containers, Nginx reverse proxy routing systems setups.",
    why: "Enables public network accessibility for security, high availability parameters integrations.",
    how: "Docker compose setups database containers mappings.",
    rules: "Production debug false parameters configuration SECRET KEY environment setup checks.",
    where: "Production cloud setups AWS / VPS deployment parameters configurations.",
    examples: {
      low: {
        prereq: "Django settings awareness.",
        code: `# LOW DIFFICULTY: Preparing settings.py for production and gathering static files
# settings.py
DEBUG = False # Disables detailed error logs for security
ALLOWED_HOSTS = ['api.mycompany.com', '127.0.0.1']

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Run in terminal to gather all CSS/JS images into one directory:
# python manage.py collectstatic`,
        filename: "prod_settings_basic.py",
        explanation: [
          "DEBUG = False - protects database structures by disabling debug screens on errors.",
          "collectstatic - copies admin panel and app static files into a single root folder for Nginx to serve."
        ]
      },
      medium: {
        prereq: "Docker and Docker Compose basic knowledge.",
        code: `# MEDIUM DIFFICULTY: Multi-container deployment setup using Docker Compose
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    command: gunicorn my_company_project.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=company_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secure_password`,
        filename: "docker-compose.yml",
        explanation: [
          "gunicorn ... --bind 0.0.0.0:8000 - boots high performance WSGI server to run Django inside container.",
          "postgres:15 - spins up a matching PostgreSQL database container automatically linked to our web container."
        ]
      },
      high: {
        prereq: "Linux servers, reverse proxy, Nginx configuration syntax.",
        code: `# HIGH DIFFICULTY: Nginx Server Block configuring Reverse Proxy and SSL
# /etc/nginx/sites-available/my_company_api

server {
    listen 80;
    server_name api.mycompany.com;

    location /static/ {
        alias /code/staticfiles/; # Serves static files directly (super fast)
    }

    location / {
        proxy_pass http://127.0.0.1:8000; # Forwards API requests to Gunicorn WSGI
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
        filename: "nginx_config.conf",
        explanation: [
          "proxy_pass http://127.0.0.1:8000 - acts as a reverse proxy, shielding Gunicorn server by accepting internet requests and forwarding them locally.",
          "location /static/ - serves assets directly from cache, avoiding Django computation overhead entirely."
        ]
      }
    }
  }
];
