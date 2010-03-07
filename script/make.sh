export JOOSEIT_ROOT=http://catalyst-dev/JavaScript/JooseIt/blib/

./Build

script/inline_buttons.pl

cp -f t/visual/index.html blib/index.html