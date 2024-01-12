<?php
/**
 * UnderStrap functions and definitions
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;



// Ajoute une colonne thumbnail dans l'admin des posts
function custom_columns_thumbnail($columns) {
    $columns['thumbnail'] = __('Thumbnail');
    return $columns;
}

// Affiche les miniatures dans la colonne ajoutée
function custom_columns_content($column_name, $post_id) {
    if ($column_name == 'thumbnail') {
        $thumbnail = get_the_post_thumbnail($post_id, array(50, 50));
        echo $thumbnail;
    }
}

// Enregistre les actions
add_filter('manage_posts_columns', 'custom_columns_thumbnail');
add_action('manage_posts_custom_column', 'custom_columns_content', 10, 2);







// UnderStrap's includes directory.
$understrap_inc_dir = 'inc';

// Array of files to include.
$understrap_includes = array(
	'/theme-settings.php',                  // Initialize theme default settings.
	'/setup.php',                           // Theme setup and custom theme supports.
	'/widgets.php',                         // Register widget area.
	'/enqueue.php',                         // Enqueue scripts and styles.
	'/template-tags.php',                   // Custom template tags for this theme.
	'/pagination.php',                      // Custom pagination for this theme.
	'/hooks.php',                           // Custom hooks.
	'/extras.php',                          // Custom functions that act independently of the theme templates.
	'/customizer.php',                      // Customizer additions.
	'/custom-comments.php',                 // Custom Comments file.
	'/class-wp-bootstrap-navwalker.php',    // Load custom WordPress nav walker. Trying to get deeper navigation? Check out: https://github.com/understrap/understrap/issues/567.
	'/editor.php',                          // Load Editor functions.
	'/block-editor.php',                    // Load Block Editor functions.
	'/deprecated.php',                      // Load deprecated functions.
);

// Load WooCommerce functions if WooCommerce is activated.
if ( class_exists( 'WooCommerce' ) ) {
	$understrap_includes[] = '/woocommerce.php';
}

// Load Jetpack compatibility file if Jetpack is activiated.
if ( class_exists( 'Jetpack' ) ) {
	$understrap_includes[] = '/jetpack.php';
}

// Include files.
foreach ( $understrap_includes as $file ) {
	require_once get_theme_file_path( $understrap_inc_dir . $file );
}



/**
 * 
 * Création dun Carousel
 * Créer un tableau JSON de tous les POST
 * 
 */


 function create_json_all_post(){

    if(is_front_page()){
        require_once get_stylesheet_directory() . '/php/all_posts_json.php';
//        exit;
    }
}

add_action('wp', 'create_json_all_post');

/**
 * Get the domaine name + https / http
 */
function get_the_url_domainename(){

	$fullUrl = 'http' . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	

}
add_action('wp_enqueue_scripts', 'get_the_url_domainename');