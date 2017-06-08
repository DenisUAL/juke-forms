# For Hash tables, on the video solution he created a constructor function w/ valueOf

valueOf is a method authomatically called by JavaScript behind the scenes when it needs a primitive value representation of the object. One case would be during cohertion (when you try to compare the object using == or !=) 

# Getters/Setters thingy

Getters and setters let you create kind of a "fake" property or a pseudo-property on a given object. We call it a "pseudo-property" because it looks like a property, you use like a property, but your object will actually run a function every time this property is used.

This is useful when you want to give access to a property that returns a dynamically computed value, or you may want to reflect the status of an internal variable without requiring the use of explicit method calls.


# Ternary operators
A one-line shorthand for an if-else statement. I'll just copy here the exelent T.J. Crowder response on Stack Overflow (https://stackoverflow.com/questions/6259982/how-do-you-use-the-conditional-operator-in-javascript)

This is a one-line shorthand for an if-else statement. It's called the conditional operator.

Here is an example of code that could be shortened with the conditional operator:

```JavaScript
if(userIsYoungerThan21) {
  serveGrapeJuice();
}
else {
  serveWine();
}
```

This can be shortened with the ?: like so:

```JavaScript
userIsYoungerThan21 ? serveGrapeJuice() : serveWine();
```

*In Javascript conditional operator can evaluate to an expression, not just a statement:*

```JavaScript
var userType = userIsYoungerThan18 ? "Minor" : "Adult";
serveDrink(userIsYoungerThan21 ? "Grape Juice" : "Wine");
```

They can even be chained:

```JavaScript
userIsYoungerThan4 ? serveMilk() : userIsYoungerThan21 ? serveGrapeJuice() : serveWine();
```
Be careful, though, or you will end up with convoluted code like this:

``` JavaScript
var k = a ? (b ? (c ? d : e) : (d ? e : f)) : f ? (g ? h : i) : j;
```


# Computed properties 

Computed Properties are a ES6 feature that allows you to put an expression in brackets [], that will be computed as the property name (aka, the property "key". This is very similar to the bracket notation, which you might have used to read and set properties already. Now you can use the same syntax in object literals, too:

Examples:

```JavaScript
var theKey = "name" // Never actually used
var myObj = {
  theKey: "Karen"
}

// { theKey: "Karen" }
```


```JavaScript
var theKey = "name"
var myObj = {
  [theKey]: "Karen"
}

// { name: "Karen" }
```



