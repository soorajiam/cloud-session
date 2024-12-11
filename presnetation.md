Cloud
computing
essentials and
projects on edge
with Cloudflare
                                Who I am
                                          • Sooraj
                                 Product Lead engineer, Obso Automation

                                                              IEEE CS Volunteer for 6 years
Keele Advanced CS grad 2022     Working on instu.com          Volunteered in many IEEE Conferences and organized
Best performance in cohort      Paxable                       a few
British council GREAT Scholar   Opentranslate.dev             Led my chapter to win best Global chapter award
                                                              Led a team of 100+ students and trained them
Lets set
some goals
             -GET CERTIFIED   -HOST YOUR
                               PORTFOLIO
What is cloud
computing?
• Cloud computing is the
  delivery of computing
  services over the internet
  ("the cloud")
Think of it as a "Pizza as a Service" 🍕

 Making Pizza at
                                                                    Cook everything
Home (Traditional   Buy all ingredients       Own an oven                                     Clean up after
                                                                       yourself
  Computing)



  Ordering Pizza      Order what you         Pay for what you                                  No cleanup
                                                                   No kitchen needed
(Cloud Computing)         need                      eat                                         required



                Key Point: Just like you don't need a pizza oven at home, you don’t usually
                                         need servers in your office!
                • Let's Stick to Our Pizza Analogy!
                  Infrastructure as a Service (IaaS)
                • Like renting a kitchen
                • You bring ingredients and cook

Cloud Service   • Example: Amazon EC2 - your virtual kitchen!
                • Platform as a Service (PaaS)

   Models       • Like having the kitchen and basic ingredients
                • You just follow the recipe
                • Example: Heroku - ready to cook!
                • Software as a Service (SaaS)
                • Like ordering a ready-made pizza
                • Just eat and enjoy
                • Example: Gmail - ready to use!
• It's Just Like a   Understanding
  Postal System!
  📬                  Computer
                     Networks
The OSI Model
Explained
Think of sending a letter to
your friend:
Layer 1 (Physical) - The
Road

• Like the actual roads and paths
• In networks: Actual cables and wireless
  signals
• "How does the message physically travel?"
Layer 2 (Data Link) -
The Local Post Office
• Like addressing letters to local addresses
• In networks: MAC addresses, local
  network
• "How do devices talk within the same
  neighborhood?"
Layer 3 (Network) -
The National Postal
System
• Like the system that routes between cities
• In networks: IP addresses, routing
• Famous example: "How does a letter get
  from New York to LA?"
Layer 4 (Transport) -
Package Types
• Like choosing between regular mail or
  express delivery
• TCP: Like certified mail (reliable,
  tracked)
• UDP: Like regular mail (faster but no
  guarantees)
• "How do we ensure the package arrives
  correctly?"
Layer 7 (Application) -
The Letter Content
• Like the actual message you write
• In networks: HTTP, FTP, SSH
• "What are you actually trying to
  communicate?"
Virtual Private Cloud (VPC)
      Your Private City in the Cloud 🌆
Understanding VPC:
Think of a Building
Public Cloud = Public City
• Everyone shares streets
• Public transportation
• Open businesses
• Shared resources
VPC = Private Building
• Private roads
• Controlled entrances
• Your own rules
• Custom layout
• Complete isolation
IP Addresses & Subnets
    Think of a Large Office Building 🏢
IP Addresses



     Like room numbers in a      192.168.1.1 is like saying
     building                    "Floor 192, Room 1”




     Public IP: The building's   Private IP: The room
     street address              number inside
Subnets




  LIKE DIVIDING THE   MARKETING: FLOOR 1   ENGINEERING: FLOOR   EACH FLOOR HAS ITS
    BUILDING INTO                                  2             OWN NUMBERING
    DEPARTMENTS                                                      SYSTEM
Public Subnet (Tourist Area) Shops facing
main road
• Visitor centers
• Public services
• Example: Web servers
Private Subnet (Employees Area) Behind
security
• No direct outside access
• Internal services only
• Example: Databases
Internet Gateway =
Main Gate



• Controls entry/exit
• Security checkpoint
• Public access point
• Like a guarded entrance
NAT Gateway =
Employee Entrance


• One-way access
• Private areas can reach internet
• Internet can't reach private areas
• Like a secure exit door
Network ACLs =
Building Rules



• Like organisation laws
• Apply to entire building ALLOW or DENY
• Stateless (checks both ways, on entry
  and exit)
Security Groups =
Department Rules
• Like security alarms
• Apply to specific departments/rooms
• ALLOW only
• Stateful (remember good visitors)
VPC Peering
Without Peering
• Drive through public roads
• Longer route
• Less secure
• More expensive
With Peering
• Private direct roads
• Secure connection
• Fast access
• Cost-effective
Load Balancers

Like a Smart Restaurant Host ️
Without Load Balancer:
• One waiter serving all tables
• Gets overwhelmed during rush hour
• If sick, restaurant stops
With Load Balancer:
• Host directs customers to free tables
• Spreads crowd evenly
• If one section is full, uses another
Reverse Proxies
What is a Reverse
Proxy?
 Proxy – server doesn’t know
 clients IP
 reverse proxy is??

Like a Hotel Concierge 🏨
• Imagine a fancy hotel:
• Guests (users) never go directly to hotel
  services
• Everything goes through the concierge
  (reverse proxy)
• Concierge knows exactly who can handle
  each request
                                    Real-World Benefits




      Security                      Caching              Load Distribution          SSL Termination
   Like the concierge        Like the concierge having      Like the concierge         Like the concierge
   checking guest IDs        common maps/brochures       knowing which restaurant   translating languages for
Blocks suspicious visitors             ready                  has free tables                 guests
 Protects actual service     Keeps copies of frequent     Sends requests to least       Handles HTTPS
       locations                    requests                   busy server           encryption/decryption
                              Faster response times        Prevents any single         Simplifies internal
                                                           service from getting         communication
                                                              overwhelmed
           Lets try a website?
                         Internet
                            ↓
            Internet Gateway (Main Entrance)
                            ↓
Public Subnet (Store Front) - Load Balancers - Web Servers
                            ↓
     Private Subnet (Staff Only) - Application Servers
                            ↓
        Private Subnet (Vault) - Database Servers
Compute in the cloud
•   Your Virtual Computer in the Cloud 💻
•   Example is EC2 and other VPS
•   Shared and dedicated
Small Instance
•   Studio apartment
•   Good for personal projects
•   Cheaper rent
Medium Instance
•   2-bedroom apartment
•   Perfect for small teams
•   Moderate cost
Large Instance
•   Penthouse suite
•   For big applications
•   Premium pricing


Cool Feature: You can "move apartments" (scale) anytime!
Storing in Cloud : Object
storage
• S3 – Simple Storage Service


• Like having infinite storage lockers:
• Never runs out of space
• Super reliable (99.999999999% durability)
• Pay for what you use
• Access files from anywhere
Cloud database



• Relational Databases (SQL)
• NoSQL Databases((MongoDB, DynamoDB)
• Key-Value Stores (Redis, Memcached)
• Wide-Column Stores (Cassandra)
• Graph Databases (Neo4j)
Social Media App
        User Profiles → MongoDB
 •   Flexible schema
 •   Easy updates
 •   Handles different profile types

 Friendships → Neo4j
 - Complex relationships
 - Friend suggestions
 - Connection patterns Feed

 Cache → Redis
 - Fast access
 - Temporary storage
 - Real-time updates
E-commerce
Platform
•   Product Catalog → MongoDB

•    - Different product types

•    - Flexible attributes

•    - Easy updates

•
    Orders → RDS (MySQL)

•    - Transaction support

•    - Data integrity

•    - Complex queries

•
    Shopping Cart → Redis

•    - Fast access

•    - Temporary storage

•    - Session management

•
                 ✓ Data is structured




                 ✓ Need ACID compliance
Use Relational
(RDS) When:
                 ✓ Complex queries needed




                 ✓ Transactions important
            ✓ Flexible schema needed

            ✓ Huge scale expected
Use NoSQL
When:
            ✓ Quick access required

            ✓ Simple queries suffice
            ✓ Speed is crucial

            ✓ Data is temporary
Use Cache
When:
            ✓ Reducing database load

            ✓ Real-time features
                                     Different
                Player Profiles
                                   player types

Try to decide
                                    Real-time
which DB to         Scores
                                     updates
use?
                                     Needs
                Match History     multiple types
                                   of queries
