module.exports = function(application){
	application.get('/jogo', function(req, res){
		application.app.controllers.jogo.iniciar(application, req, res)
	});

	application.get('/sair', function(req, res){
		application.app.controllers.jogo.sair(application, req, res)
	});

	application.get('/suditos', function(req, res){
		application.app.controllers.jogo.suditos(application, req, res)
	});

	application.get('/pergaminhos', function(req, res){
		application.app.controllers.jogo.pergaminhos(application, req, res)
	});

	application.post('/ordernar-acao-sudito', function(req, res) {
		application.app.controllers.jogo.ordernarAcaoSudito(application, req, res);
	});

	application.get('/revogar-acao', function(req, res){
		application.app.controllers.jogo.revogarAcao(application, req, res)
	});
}
