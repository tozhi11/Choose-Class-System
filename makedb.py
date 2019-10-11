import sqlite3
import time
import os

conn = sqlite3.connect('choose-class-system.db')
c = conn.cursor()
print "Opened database successfully"
c = conn.cursor()
c.execute('''CREATE TABLE PEOPLE
       (ID          CHAR(10) PRIMARY KEY     NOT NULL,
        PASSWORD    CHAR(50)                 NOT NULL,
        NAME        CHAR(50)                 NOT NULL,
        POSITION    CHAR(50)                 NOT NULL,
        TELEPHONE   CHAR(50)                         ,
        COLLEGE     CHAR(50)                         ,
        YEAR        CHAR(10)                         ,
        COURSE      CHAR(50));''')
c = conn.cursor()
c.execute('''CREATE TABLE CLASS
        (CLASSID    CHAR(50) PRIMARY KEY     NOT NULL,
         CLASSNAME  CHAR(50)                 NOT NULL,
         CLASSTIME  CHAR(50)                 NOT NULL,
         ADDRESS    CHAR(50)                 NOT NULL,
         TEACHER    CHAR(50)                 NOT NULL,
         COUNT      INT                      NOT NULL,
         POINT      INT                      NOT NULL  
        );''')
    
c = conn.cursor()
print "Table created successfully"
conn.commit()
conn.close()