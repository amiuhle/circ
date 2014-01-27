// Generated by CoffeeScript 1.4.0
(function() {
  "use strict";
  var HTMLList, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  var exports = (_ref = window.chat) != null ? _ref : window.chat = {};

  //
  // A list of elements that can be manipulated,
  // keyed by case-insensitive strings.
  //
  HTMLList = (function(_super) {

    __extends(HTMLList, _super);

    function HTMLList($list, $template) {
      this.$list = $list;
      this.$template = $template;
      this.nodes = {};
      this.nodeNames = [];
      this._addFooterNode();
      HTMLList.__super__.constructor.apply(this, arguments);
    }

    HTMLList.prototype._addFooterNode = function() {
      this._footerNode = this._createNode('footer');
      this.$list.append(this._footerNode.html);
      this._footerNode.html.addClass('footer');
    };

    // Sets the text of the footer node, e.g. '<add channel>' or '<add server>'.
    HTMLList.prototype.setFooterNodeText = function(text) {
      this._footerNode.content.text(text);
    };

    HTMLList.prototype.add = function(name) {
      return this.insert(this.nodeNames.length, name);
    };

    HTMLList.prototype.insert = function(index, name) {
      var key = name.toLowerCase();
      if (key in this.nodes) {
        return;
      }
      if (index < 0 || index > this.nodeNames.length) {
        throw "invalid index: " + index + "/" + this.nodeNames.length;
      }
      var newNode = this._createNode(name);
      this._insertHTML(index, newNode);
      this.nodes[key] = newNode;
      return this.nodeNames.splice(index, 0, name);
    };

    HTMLList.prototype._insertHTML = function(index, newNode) {
      var nextNode = this.get(index) || this._footerNode;
      console.log('adding', newNode, 'at', index, 'with next node', nextNode);
      newNode.html.insertBefore(nextNode.html);
    };

    HTMLList.prototype.get = function(index) {
      var key = this.nodeNames[index];
      if (key) {
        key = key.toLowerCase();
        return this.nodes[key];
      }
      return false;
    };

    HTMLList.prototype.getPrevious = function(nodeName) {
      var i = this.nodeNames.indexOf(nodeName);
      return this.nodeNames[i - 1];
    };

    HTMLList.prototype.getNext = function(nodeName) {
      var i = this.nodeNames.indexOf(nodeName);
      return this.nodeNames[i + 1];
    };

    HTMLList.prototype.remove = function(name) {
      var key = name.toLowerCase();
      var node;
      if (node = this.nodes[key]) {
        node.html.remove();
        delete this.nodes[key];
        return removeFromArray(this.nodeNames, key);
      }
    };

    HTMLList.prototype.clear = function() {
      this.nodes = {};
      this.nodeNames = [];
      this.$list.find('li:not(.footer)').remove();
    };

    HTMLList.prototype.addClass = function(name, c) {
      var _ref1;
      return (_ref1 = this.nodes[name]) != null ? _ref1.html.addClass(c) : void 0;
    };

    HTMLList.prototype.removeClass = function(name, c) {
      var _ref1;
      return (_ref1 = this.nodes[name]) != null ? _ref1.html.removeClass(c) : void 0;
    };

    HTMLList.prototype.hasClass = function(nodeName, c) {
      var _ref1;
      return (_ref1 = this.nodes[nodeName]) != null ? _ref1.html.hasClass(c) : void 0;
    };

    HTMLList.prototype.rename = function(name, text) {
      var _ref1;
      return (_ref1 = this.nodes[name]) != null ? _ref1.content.text(text) : void 0;
    };

    HTMLList.prototype._createNode = function(name) {
      var _this = this;
      var node = {
        html: this._htmlify(name),
        name: name
      };
      node.content = $('.content-item', node.html);
      node.html.mousedown(function(event) {
        switch (event.which) {
        case 1:
          return _this._handleClick(node);
        case 2:
          return _this._handleMiddleClick(node);
        // case 3: // not handling right-clicks
        }
      });
      node.html.dblclick(function(event) {
        if (event.which == 1) {
          return _this._handleDoubleClick(node);
        }
      });
      return node;
    };

    HTMLList.prototype._handleClick = function(node) {
      this._emitClickEvent(node, 'clicked');
    };

    HTMLList.prototype._handleMiddleClick = function(node) {
      this._emitClickEvent(node, 'midclicked');
    };

    HTMLList.prototype._handleDoubleClick = function(node) {
      this._emitClickEvent(node, 'dblclicked');
    };

    HTMLList.prototype._emitClickEvent = function(node, eventName) {
      var emitType;
      if (node == this._footerNode) {
        emitType = 'footer_' + eventName;
      } else {
        emitType = eventName;
      }
      this.emit(emitType, node.name);
    };

    HTMLList.prototype._htmlify = function(name) {
      var html = this.$template.clone();
      $('.content-item', html).text(name);
      return html;
    };

    return HTMLList;

  })(EventEmitter);

  exports.HTMLList = HTMLList;

}).call(this);
