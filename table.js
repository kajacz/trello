$(document).ready(function() {
  $(".defaultTable").dragtable();

  $("#footerTable").dragtable({ excludeFooter: true });

  $("#onlyHeaderTable").dragtable({ maxMovingRows: 1 });

  $("#persistTable").dragtable({ persistState: "/someAjaxUrl" });

  $("#handlerTable").dragtable({ dragHandle: ".some-handle" });

  $("#constrainTable").dragtable({ dragaccept: ".accept" });

  $("#customPersistTable").dragtable({
    persistState: function(table) {
      table.el.find("th").each(function(i) {
        if (this.id != "") {
          table.sortOrder[this.id] = i;
        }
      });
      $.ajax({ url: "/myAjax?hello=world", data: table.sortOrder });
    }
  });

  $("#localStorageTable").dragtable({
    persistState: function(table) {
      if (!window.sessionStorage) return;
      var ss = window.sessionStorage;
      table.el.find("th").each(function(i) {
        if (this.id != "") {
          table.sortOrder[this.id] = i;
        }
      });
      ss.setItem("tableorder", JSON.stringify(table.sortOrder));
    },
    restoreState: eval("(" + window.sessionStorage.getItem("tableorder") + ")")
  });
});
