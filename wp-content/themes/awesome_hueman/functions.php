<?php

add_action( 'wp_enqueue_scripts', 'enqueue_awesome_scripts' );

function enqueue_awesome_scripts() {
	$ss = get_stylesheet_directory_uri();

    wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );

    wp_enqueue_script('sketchjs', $ss . '/js/sketch.min.js', array(), false, true);
    wp_enqueue_script('awesome-main', $ss . '/js/main.js', array('sketchjs'), false, true);
    wp_enqueue_script('bg-canvas', $ss . '/js/bg-points-and-lines.js', array('awesome-main'), false, true);
}

?>