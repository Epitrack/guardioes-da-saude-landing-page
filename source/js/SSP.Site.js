var SSP = SSP || {};
SSP.Site = {

  setUp: function() {},

  Lingueta: {
    setUp: function() {
      this.bindEvents();
      this.checarEstado();
    },
    bindEvents: function() {
      var callback = SSP.delegate(this, this.eventsHandler);
      $("#lingueta").on("click mousedown", callback);
    },
    eventsHandler: function(event){
      if(event.type == "click") {
        $("body").toggleClass('mostrar-contato');
        this.checarEstado();
      } else if(event.type == "mousedown") {
        event.preventDefault();
      }
    },
    checarEstado: function () {
      if (window.contatoFormTimer) {
        clearInterval(window.contatoFormTimer);
      }

      var logoContainer = $(".logo-container");
      var contatoFormulario = $("#contato-formulario");

      if($("body").hasClass('mostrar-contato')) {
        logoContainer
          .removeClass('col-xs-offset-4')
          .addClass('col-xs-offset-1');
        window.contatoFormTimer = setTimeout(function() {
            contatoFormulario.show();
        }, 500);
      } else {
        logoContainer
          .addClass('col-xs-offset-4')
          .removeClass('col-xs-offset-1');
          contatoFormulario.hide();
      }
    }
  },

  Formulario: {

    _form: null,

    setUp: function() {
      this._form = $("#contato-formulario");
      this._form.validator();
      this.Envio._url = this._form.attr('action');
      this.registrarEventos();
    },

    registrarEventos: function() {
      var cancelHandler = SSP.delegate(this, this.cancelHandler);
      var submitHandler = SSP.delegate(this, this.submitHandler);
      this._form.on("submit", submitHandler);
      $("#botaoCancelar").on("click", cancelHandler);
    },

    cancelHandler: function() {
      var ajax = this.Envio._ajax;


      if(ajax !== null) {
        ajax.abort();
      } else {
        $("body").removeClass('mostrar-contato');
        SSP.Site.Lingueta.checarEstado();
        this._form.get(0).reset();
        this._form.find(".form-group").removeClass('has-error');
      }
    },

    submitHandler: function(event) {
      if (event.isDefaultPrevented()) {

      } else {
        event.preventDefault();
        this.Envio.enviar();
      }
    },

    desabilitar: function(status) {
      var fields = this._form.find('input,textarea').not("#botaoCancelar");
          fields.attr('disabled', status);
      if(arguments.length > 1) {
        fields.filter('#botaoEnviar').val(arguments[1]);
      }
    },

    Envio: {

      _url: "",

      _ajax: null,

      _params: {},

      setUp: function() {
        var enviando, enviado, naoEnviado;

        enviando = SSP.delegate(this, this.enviando);
        enviado = SSP.delegate(this, this.enviado);
        naoEnviado = SSP.delegate(this, this.naoEnviado);


        this._params = {
          url: this._url,
          type: "POST",
          beforeSend: enviando,
          success: enviado,
          error: naoEnviado
        };
      },

      enviar: function() {
        this._params.data = $("#contato-formulario").serialize();
        this._ajax = $.ajax(this._params);
      },

      enviando: function() {
        this.parent().desabilitar(true, "Enviando...");
      },

      enviado: function(data) {
        this.parent().desabilitar(false, "Enviar");
        this.parent()._form.get(0).reset();
        this._ajax = null;
      },

      naoEnviado: function() {
        this.parent().desabilitar(false, "Enviar");
        this._ajax = null;
      }
    }
  }
};
