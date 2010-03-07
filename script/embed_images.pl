#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use JSON;
use Path::Class;
use Getopt::LL::Simple qw(
    --mhtmlroot=s
);

my $mhtml_root = $ARGV{'--mhtmlroot'} || 'http://catalyst-dev/JavaScript/JooseIt/blib/lib/JooseIt/static/images/navigation/buttons.txt';



use CSS::DOM;

my $sheet = CSS::DOM::parse( file("$FindBin::Bin/css.css")->slurp );


print $sheet->cssRules->[0]->style->getPropertyValue('font-variant');

#  use CSS::DOM::Style;
#  my $style = CSS::DOM::Style::parse(
#      'background: red; font-size: large'
#  );
#
#  my $other_sheet = new CSS::DOM; # empty
#  $other_sheet->insertRule(
#     'a{ text-decoration: none }',
#      $other_sheet->cssRules->length,
#  );
#  # etc.
#  
#  # access DOM properties
#  
#  $style->fontSize;          # returns 'large'
#  $style->fontSize('small'); # change it