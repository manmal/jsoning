const test = require("ava");
const jsoning = require("../src/server.js");

// new database
const database = new jsoning("db.json");

test("new database", (t) => {
  let db = new jsoning("hello.json");
  t.is(db.set("foo", "bar"), true, "new database!!!");
});

test("test started", (t) => {
  t.pass();
});

test("value set should return true", (t) => {
  t.is(database.set("khaleel", "gibran"), true, "Jsoning#set successful!");
});

test("set boolean", (t) => {
  let type = new jsoning("type.json");
  t.is(type.set('bool', true), true, "boolean!");
  t.is(type.set('number', 3), true, "number!!!");
  t.is(type.set('object', { "hi": "another hello" }), true, "object!!!");
});

test("value all should return all", (t) => {
  console.log(database.all());
  t.deepEqual(database.all(), { khaleel: "gibran" }, "Jsoning#all successful!");
});

test("value get should return existing element", (t) => {
  t.is(database.get("khaleel"), "gibran", "Jsoning#get successful!");
});

test("value delete should return delete", (t) => {
  t.is(database.delete("khaleel"), true, "Jsoning#delete successful!");
});

test("value delete should return false for non-existing element", (t) => {
  t.is(
    database.delete("wakanda"),
    false,
    "Jsoning#delete false test successful!"
  );
});

test("value get should return false for non-existing element", (t) => {
  t.is(database.get("wakanda"), false, "Jsoning#get false test successful!");
});

test("clear should clear everything", (t) => {
  database.set("foo", "bar");
  database.set("hi", "hello");
  database.set("en", "db");
  t.is(database.clear(), true, "Cleared successfully!");
});

test("#set empty", (t) => {
  const error = t.throws(
    () => {
      database.set("");
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("#set not string", (t) => {
  const error = t.throws(
    () => {
      database.set(3, "hi");
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("#delete empty", (t) => {
  const error = t.throws(
    () => {
      database.delete("");
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("#delete not string", (t) => {
  const error = t.throws(
    () => {
      database.delete(3);
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("#get empty", (t) => {
  const error = t.throws(
    () => {
      database.get("");
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("invalid db file", (t) => {
    const error = t.throws(
      () => {
        const jsondb = new jsoning("example")
      },
      { instanceOf: TypeError },
      "error thrown!"
    );
  });

  test("Jsoning#math basic functions", (t) => {
    database.set("add", 1);
    database.set("minus", 5);
    database.set("into", 5);
    database.set("by", 4);
    t.is(database.math('add', 'add', 1), true, "Jsoning#math - add");
    t.is(database.math('minus', 'subtract', 4), true, "Jsoning#math subtract passed!");
    t.is(database.math('into', 'multiply', 3), true, "Jsoning#math - multiply")
    t.is(database.math('by', 'divide', 2), true, "Jsoning#math - divide");
    t.is(database.math('hisfdsd', 'fese', 2), false, "Jsoning#math - false!");
    // t.is(database.math("add", "some", "3"), false, "Jsoning#math false");
    // t.is(database.math("add", "add", "3"), false, "Jsoning#math false")
  });

test("Jsoning#has", (t) => {
    t.is(database.has("somevalueblahblah"), false, "Jsoning#has test false");
    t.is(database.has("add"), true, "Jsoning#has test true");
});

test("fake keys", (t) => {
    const error = t.throws(
    () => {
      database.math(3);
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("fake math operation", (t) => {
    const error = t.throws(
    () => {
      database.math("3", 2, 2);
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("fake math operand", (t) => {
    const error = t.throws(
    () => {
      database.math("3", "add", "2");
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("throw errors and make this test successful", (t) => {
    const error = t.throws(
    () => {
      database.math("khaleel", "add", "2");
    },
    { instanceOf: TypeError },
    "error thrown!"
  );
});

test("new array", (t) => {
    t.is(database.push("newarray", "3"), true, "new array true");
    const error = t.throws(
        () => {
        database.push("khaleel", "2");
        },
        { instanceOf: TypeError },
        "error thrown!"
    );
})