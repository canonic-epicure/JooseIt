use Module::Build::JSAN::Installable;

my $build = Module::Build::JSAN::Installable->new(

	module_name    => 'Symbie',
	create_makefile_pl => 'passthrough',
	dist_version   => 0.01,
	dist_author   => 'SamuraiJack',
	dist_abstract  => 'Framework for web-applications which looks like web-sites',
	license        => 'perl'
);

$build->create_build_script;


