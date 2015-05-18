Install instructions
=======

1. You will need to install yeoman globally

    npm install -g yo

2. Then, when in the folder of the generator run

    sudo npm link

3. Once that has been you should be able to within a new folder (*WARNING* this command will add files to the folder it's run in)

    yo interactive-au

4. Once the generator has completed:

    npm install

5. Then run

    bower install

6. Assuming all this went along swimingly, you should be to

    gulp serve

