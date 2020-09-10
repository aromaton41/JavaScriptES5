var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      if(data.allItems[type].length > 0){
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
          ID = 0;
      }
      

      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;

    },

    testing: function(){
        console.log(data);
    }

  };
})();

var UIController = (function () {
  var DOMstring = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
  };
  return {
    getinput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: document.querySelector(DOMstring.inputValue).value,
      };
    },

    getDONstring: function () {
      return DOMstring;
    },
  };
})();

var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UICtrl.getDONstring();

    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrAddItem();
      }
    });
  };

  var ctrAddItem = function () {
      var input,newItem;
    // 1. Get the filed input data
     input = UICtrl.getinput();

    // 2. Add the item to the budget controller
     newItem = budgetCtrl.addItem(input.type,input.description,input.value);

    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI
  };
  return {
    init: function () {
      console.log("Appclication has started.");
      setupEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
