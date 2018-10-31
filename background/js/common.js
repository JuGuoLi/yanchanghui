  function $(id) {
    return document.getElementById(id);
  }

  function creatXhr() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else {
      return new ActiveXObject('Microsoft XMLHttp');
    }
  }

