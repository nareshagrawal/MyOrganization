import applicationRoutes from './application.route';

export default (app) => {

  app.use('/',applicationRoutes);

  // If response is 404 then return folling message 
  app.use(function (req,res,next){
    res.status(404).json({
          message: 'Unable to find the requested resource!'
      });
  });

}

