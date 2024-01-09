<?php
/**
 * Template Name: Home
 *
 *
 */
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

/**
 * Le tableau JSON des post est créé dans functions qui appele php/all_posts_json
 */
?>

<!--Fin Rajout des css OWL-->

<script>const themeDirectoryUri = "<?php echo get_stylesheet_directory_uri(); ?>";</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">





<body>


<div class="wrapper" id="page-wrapper">

    <div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

        <div class="row">


            


                <?php
                // Do the left sidebar check and open div#primary.
                get_template_part( 'global-templates/left-sidebar-check' );
                ?>
                <header id="banner">

                    <div class="bg-banner"></div>

                    <div class="infos">
                        <div class="categories-wrapper"></div>
                        <div class="title"></div>
                        <div class="dots"></div>
                    </div>

                    <div class="arrow arrow_left">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/icon/arrow_left.png" alt="fleche slide gauche">
                    </div>
                    <div class="arrow arrow_right">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/icon/arrow_right.png" alt="fleche slide droite">
                    </div>
                    


                </header>

                <!--Blog and Filter-->


                <main class="site-main row" id="main">



                        <div class="col-md-8 col-sm-12">

                            <header class="entry-header">
                                <h1 class="entry-title">Upcoming Events</h1>
                                <div class="filters">
                                    <?php
                                        get_template_part('template-parts/filters_cat');
                                    ?>  
                                </div>
                                
                            </header>
                            
                            <div class="bloggerfilter">
                                
                                <div id="blogger"></div>

                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            
                            <div id="search">
                                <span>Search</span>
                                <?php echo get_search_form(); ?>
                            </div>

                        </div>



                </main>
        </div>
    </div>
</div>








</body>
<script src="<?php echo get_stylesheet_directory_uri() . '/js/jquery-3.7.1.js' ?>"></script>

<script src="<?php echo get_stylesheet_directory_uri() . '/js/slideshow.js' ?>"></script>

<script src="<?php echo get_stylesheet_directory_uri() . '/js/filters.js' ?>"></script>

<?php //get_sidebar();?>
<?php get_footer();?>