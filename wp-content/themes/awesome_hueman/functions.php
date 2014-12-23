<?php

add_action( 'wp_enqueue_scripts', 'enqueue_awesome_scripts' );

function enqueue_awesome_scripts() {
	$ss = get_stylesheet_directory_uri();

    wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );

    wp_enqueue_script('sketchjs', $ss . '/js/sketch.min.js', array(), false, true);
    wp_enqueue_script('awesome-main', $ss . '/js/main.js', array('sketchjs'), false, true);
    wp_enqueue_script('bg-canvas', $ss . '/js/bg-points-and-lines.js', array('awesome-main'), false, true);

    // Add Prism code syntax highlighting.
    wp_enqueue_style( 'prism-css', $ss.'/css/prism.css' );
    wp_enqueue_script('prism-js', $ss . '/js/prism.js', array(), false, true);

}

// I want link post types.
function alx_setup() {	
	// Enable automatic feed links
	add_theme_support( 'automatic-feed-links' );
	
	// Enable featured image
	add_theme_support( 'post-thumbnails' );
	
	// Enable post format support
	add_theme_support( 'post-formats', array( 'link', 'aside', 'gallery', 'image', 'status' ) );
	
	// Declare WooCommerce support
	add_theme_support( 'woocommerce' );
	
	// Thumbnail sizes
	add_image_size( 'thumb-small', 160, 160, true );
	add_image_size( 'thumb-medium', 520, 245, true );
	add_image_size( 'thumb-large', 720, 340, true );

	// Custom menu areas
	register_nav_menus( array(
		'topbar' => 'Topbar',
		'header' => 'Header',
		'footer' => 'Footer',
	) );
}


// Overriding the site title to add a fontawesome-type logo.
function alx_site_title() {

	$sitename = '<a href="'.home_url('/').'" rel="home"><span class="fa-logo">
<i class="fa fa-angle-left fa-3x"></i>
<i class="fa fa-paint-brush fa-3x"></i>
<i class="fa fa-angle-right fa-3x"></i>
</span></a>';

	// Text or image?
	if ( ot_get_option('custom-logo') ) {
		$logo = '<img src="'.ot_get_option('custom-logo').'" alt="'.get_bloginfo('name').'">';
	} else {
		$logo = 'Canvas is <em>Awesome</em>'; //get_bloginfo('name');
	}
	
	$link = '<a href="'.home_url('/').'" rel="home">'.$logo.'</a>';
	
	if ( is_front_page() || is_home() ) {
		$sitename .= '<h1 class="site-title">'.$link.'</h1>'."\n";
	} else {
		$sitename .= '<p class="site-title">'.$link.'</p>'."\n";
	}
	
	return $sitename;
}


?>