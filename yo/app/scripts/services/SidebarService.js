'use strict';

angular.module('app.services').factory('SidebarService', function () {
    var expanded = false,
        messages = [],
        selectedCountry = { name : '' };

    return {
        isExpanded: function () {
            return expanded;
        },
        toggleExpanded: function() {
            expanded = expanded === true ? false : true;
        },
        setExpanded: function(value) {
            expanded = value;
        },
        setMessages: function(newMessages) {
            angular.copy(newMessages, messages);
        },
        getMessages: function() {
            return messages;
        },
        getSelectedCountry: function() {
            return selectedCountry;
        },
        setSelectedCountry: function(country) {
            selectedCountry.name = country;
        }
    };
});
