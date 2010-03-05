ROOT=http://catalyst-dev/JavaScript/JooseIt/blib/lib/JooseIt/static/css/buttons.css
CSS_FILE=blib/lib/JooseIt/static/css/buttons.css


chmod 664 $CSS_FILE

java -jar bin/cssembed-0.3.2.jar --mhtml --mhtmlroot $ROOT $CSS_FILE > $CSS_FILE.mhtml

mv $CSS_FILE.mhtml $CSS_FILE