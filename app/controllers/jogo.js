module.exports.iniciar = function(application, req, res) {

    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    var msg = '';

    if (req.query.comando_invalido !== '') {
        msg = req.query.msg;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciar(res, req.session.casa, req.session.usuario, msg);
}

module.exports.sair = function(application, req, res) {
    
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}

module.exports.suditos = function(application, req, res) {

    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    res.render('aldeoes', { validacao: {} });
}

module.exports.pergaminhos = function(application, req, res) {

    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.getAcoes(req.session.usuario, res);
}

module.exports.ordernarAcaoSudito = function(application, req, res) {

    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');
        return;
    }
    
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect('/jogo?msg=A');
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);

    res.redirect('/jogo?msg=B');
}

module.exports.revogarAcao = function(application, req, res) {
    
        if (!req.session.autorizado) {
            res.send('Usuário precisa fazer login');
            return;
        }

        var url_query = req.query;
    
        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.JogoDAO(connection);
        var id = url_query.id_acao;
        
        JogoDAO.revogarAcao(id, res);
    }
