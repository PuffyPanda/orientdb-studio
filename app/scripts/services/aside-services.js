var aside = angular.module('aside.services', []);

aside.factory('Aside', function ($rootScope) {

    var params = {
        cls: ""
    }

    return {
        params: params,
        show: function (params) {


            this.params.scope = params.scope;
            this.params.tpl = params.template;
            this.params.title = params.title;
            this.params.absolute = params.absolute != undefined ? params.absolute : true;
            this.params.fullscreen = params.fullscreen != undefined ? params.fullscreen : false;
            if (params.show) {
                this.params.cls = 'show';
                $rootScope.$broadcast("aside:open");
            } else {
                $rootScope.$broadcast("aside:close");
                this.params.cls = '';
            }
            if (params.fullscreen) {
                this.params.cls += " oaside-fullscreen";
            }
            this.params.loading = true;
            if (!this.params.scope.$$phase && !this.params.scope.$root.$$phase) {
                this.params.scope.$apply();
            }
        },
        destroy: function () {
            $rootScope.$broadcast("aside:close");
            delete this.params.scope;
            delete this.params.tpl;
            delete this.params.title;
            delete this.params.absolute;
            delete this.params.cls;
        },
        hide: function () {
            this.params.cls = "";
            $rootScope.$broadcast("aside:close");
        },
        toggle: function () {
            this.params.cls = (this.params.cls == "" ? "show" : "");
            if (this.params.cls == "") {
                $rootScope.$broadcast("aside:close");
            } else {
                $rootScope.$broadcast("aside:open");
            }

        },
        fullScreen: function (val) {
            if (val) {
                if (this.params.cls)
                    this.params.cls += " oaside-fullscreen";
            } else {
                if (this.params.cls)
                    this.params.cls = this.params.cls.replace("oaside-fullscreen", "");
            }
            console.log(this.params.cls);

        },
        isOpen: function () {
            return this.params.cls == "show";
        },
        isAbsolute: function () {
            return this.params.absolute;
        }
    }
});