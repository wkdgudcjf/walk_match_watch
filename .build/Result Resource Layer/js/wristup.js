(function() {
    CONTEXT_TYPE = 'WRIST_UP';
	start();
    /**
      * Registers a change listener
      * @public
      */
     function start() {
      //   resetData();
    	 webapis.motion.start(
             CONTEXT_TYPE,
             function onSuccess() {
            	 fetch("setup");
             }
         );
     }
     /**
      * Unregisters a change listener
      * @public
      */
     function stop() {
    	 webapis.motion.stop(CONTEXT_TYPE);
     }

     /**
      * Initializes the module
      */
})();
