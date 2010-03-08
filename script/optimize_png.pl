use strict;

use File::Find::Rule;
use Path::Class;
use File::Copy;
use File::Copy::Recursive qw(fcopy rcopy dircopy fmove rmove dirmove);

use Getopt::LL::Simple qw(
	--target!=s
	--keep24=s
	--copy=s
);


#================================================================================================================================================================================================================================================
#setting target

my $TARGET = $ARGV{'--target'};
my $KEEP24 = $ARGV{'--keep24'};
my $COPY = $ARGV{'--copy'};

if ($TARGET && $COPY) {
	#================================================================================================================================================================================================================================================
	#copying working copy
	
	$File::Copy::Recursive::RMTrgDir = 1;
	dircopy('../Travel/root/static/images', $TARGET);
	
	
	#================================================================================================================================================================================================================================================
	#removing .svn dirs
	
	my @svn = File::Find::Rule->directory->name('.svn')->prune->in($TARGET);
	
	foreach (@svn) {
		File::Copy::Recursive::pathrmdir($_);
	}
}

#================================================================================================================================================================================================================================================
#optimizing all *.png files

my $PNG = dir($TARGET); #->subdir('root', 'static', 'images');

my @png = File::Find::Rule->or(
	File::Find::Rule->file->name('*.png')
)->in($PNG);


my $before_total = 0;
my $after_total = 0;

foreach my $file (@png) {
	my ($before, $after) = optimize_png($file, 2);
	
	$before_total += $before;
	$after_total += $after;
	printf("File %150s: before=%7d, after=%7d, optimization=%.3f%%\n", $file, $before, $after, 100 * ($after - $before) / $before);
}

#================================================================================================================================================================================================================================================
#DONE

print "PNG optimization done\n";
printf("Totally, before=%10d, after=%10d, optimization=%.3f%%\n", $before_total, $after_total, 100 * ($after_total - $before_total) / $before_total);

#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub optimize_png {
	my ($filename, $iterations_num) = @_;
	
	my $before = file($filename)->stat->size;
	
	for (my $i = 0; $i < $iterations_num; $i++) {
		optimize_png_optipng_pngout($filename);
		if (!$KEEP24) {
			optimize_png_pngnq($filename);
		}
	}
	
	my $after = file($filename)->stat->size;
	
	return ($before, $after);
} 


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub optimize_png_optipng_pngout {
	my ($filename) = @_;
	
	my $before = file($filename)->stat->size;
	
	qx!optipng -q -o7 $filename!;	
	qx!bin/pngout/pngout-linux-i386 -q $filename!;
	
	my $after = file($filename)->stat->size;
	
	return ($before, $after);
} 


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub optimize_png_pngnq {
	my ($filename) = @_;
	
	my $before = file($filename)->stat->size;
	
	qx!pngnq $filename!;
	
	my $after = file($filename)->stat->size;
	
	my $nq8_filename = $filename;
	$nq8_filename =~ s/\.png$/-nq8.png/;
	
	my $after_pngnq = file($nq8_filename)->stat->size;
	
	if ($after_pngnq < $after) {
		$after = $after_pngnq;
		move($nq8_filename, $filename) or die "move failed";
	} else {
		unlink($nq8_filename);
	}
	
	return ($before, $after);
}