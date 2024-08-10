var addTaskButton = document.querySelector("#addtask");
var allItems = document.querySelector(".todoitems");
var template = document.querySelector(".todoTemplate");
var ItemId = 0;
var InputAddTask = document.querySelector(".TaskInput");

var allItemsStorage = [];

function removeItem(idItem) {
  document.querySelector("#Item-" + idItem).remove();
  allItemsStorage = allItemsStorage.filter((element) => element.id != idItem);
  localStorage.setItem("TasksList", JSON.stringify(allItemsStorage));
}

window.onload = () => {
  allItemsStorage = JSON.parse(localStorage.getItem("TasksList")) || [];
  ItemId = allItemsStorage.length
    ? allItemsStorage[allItemsStorage.length - 1].id
    : 0;

  allItemsStorage.forEach((parsedElement) => {
    var newTemplate = template.content.cloneNode(true);
    newTemplate.querySelector(".todoitem").id = "Item-" + parsedElement.id;
    newTemplate.querySelector(".todotitle").textContent = parsedElement.text;
    newTemplate.querySelector(".todoComplete").checked = parsedElement.checked;
    newTemplate.querySelector(".todoComplete").addEventListener("click", () => {
      changeChecked(parsedElement.id);
    });
    newTemplate.querySelector(".removeItem").id =
      "RemoveItem" + parsedElement.id;
    newTemplate
      .querySelector(".removeItem")
      .addEventListener("click", () => removeItem(parsedElement.id));
    allItems.append(newTemplate);
  });
};

addTaskButton.addEventListener("click", () => {
  if (InputAddTask.value.trim() === "") return;

  ItemId++;
  var newelement = template.content.cloneNode(true);
  newelement.querySelector(".todoitem").id = "Item-" + ItemId;
  newelement.querySelector(".todotitle").textContent = InputAddTask.value;
  newelement.querySelector(".removeItem").id = "RemoveItem" + ItemId;

  var removItem = ItemId;
  newelement
    .querySelector(".removeItem")
    .addEventListener("click", () => removeItem(removItem));
  newelement.querySelector(".todoComplete").addEventListener("click", () => {
    changeChecked(removItem);
  });
  allItems.append(newelement);

  var storageAdd = {
    text: InputAddTask.value,
    checked: false,
    id: removItem,
  };
  allItemsStorage.push(storageAdd);
  localStorage.setItem("TasksList", JSON.stringify(allItemsStorage));
  InputAddTask.value = "";
});

function changeChecked(idchecked) {
  const itemIndex = allItemsStorage.findIndex((item) => item.id === idchecked);
  if (itemIndex !== -1) {
    allItemsStorage[itemIndex].checked = !allItemsStorage[itemIndex].checked;
    localStorage.setItem("TasksList", JSON.stringify(allItemsStorage));
  }
}
