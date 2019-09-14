<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if (!class_exists('Timber')) {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
    });

    add_filter('template_include', function ($template) {
        return get_stylesheet_directory() . '/static/no-timber.html';
    });

    return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array('templates', 'views');

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site
{
    /** Add timber support. */
    public function __construct()
    {
        add_action('after_setup_theme', array($this, 'theme_supports'));
        add_filter('timber/context', array($this, 'add_to_context'));
        add_filter('timber/twig', array($this, 'add_to_twig'));
        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_taxonomies'));
        add_action('wp_footer', [$this, 'loadScripts']);

        add_action('wp_ajax_more_all_posts', array($this, 'ajax_more_all_posts'));
        add_action('wp_ajax_nopriv_more_all_posts', array($this, 'ajax_more_all_posts'));
        add_action('wp_print_styles', array($this, 'wps_deregister_styles'));
        add_action('wp_footer', array($this, 'my_deregister_scripts'));

        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('admin_print_styles', 'print_emoji_styles');

        remove_action('wp_head', 'feed_links_extra', 3);
        remove_action('wp_head', 'feed_links', 2);
        remove_action('wp_head', 'rsd_link');

        remove_action('wp_head', 'rest_output_link_wp_head');
        remove_action('wp_head', 'wp_oembed_add_discovery_links');
        remove_action('wp_head', 'wp_generator');

        // disable for posts
        add_filter('use_block_editor_for_post', '__return_false', 10);

		// disable for post types
        add_filter('use_block_editor_for_post_type', '__return_false', 10);

		if (function_exists('acf_add_options_page')) {
			acf_add_options_page();
		}

        // Cleanup Dashboard
        add_action('wp_dashboard_setup', array($this, 'wpc_remove_dashboard_widgets'), 9999);


        parent::__construct();
    }

    /** This is where you can register custom post types. */
    public function register_post_types()
    {

    }

    /** This is where you can register custom taxonomies. */
    public function register_taxonomies()
    {

    }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function add_to_context($context)
    {
        $context['foo'] = 'bar';
        $context['stuff'] = 'I am a value set in your functions.php file';
        $context['notes'] = 'These values are available everytime you call Timber::get_context();';
        $context['menu'] = new Timber\Menu();
        $context['site'] = $this;
        $context['options'] = get_fields('options');
        return $context;
    }

    public function theme_supports()
    {

        // disable the admin bar
        add_filter('show_admin_bar', '__return_false');

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5', array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            )
        );

        /*
         * Enable support for Post Formats.
         *
         * See: https://codex.wordpress.org/Post_Formats
         */
//        add_theme_support(
//            'post-formats', array(
//                'aside',
//                'image',
//                'video',
//                'quote',
//                'link',
//                'gallery',
//                'audio',
//            )
//        );

        add_theme_support('menus');
    }

    function loadScripts()
    {
        wp_enqueue_script('vendor-js', get_template_directory_uri() . '/assets/js/vendor.js', array(), '1.0.0', true);
        wp_enqueue_script('custom-js', get_template_directory_uri() . '/assets/js/custom.js', array(), '1.0.0', true);

        // in JavaScript, object properties are accessed as ajax_object.ajax_url, ajax_object.we_value
        wp_localize_script('custom-js', 'ajax_object',
            array('ajax_url' => admin_url('admin-ajax.php'), 'we_value' => 1234));
    }

    /** This Would return 'foo bar!'.
     *
     * @param string $text being 'foo', then returned 'foo bar!'.
     */
    public function myfoo($text)
    {
        $text .= ' bar!';
        return $text;
    }

    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension.
     */
    public function add_to_twig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addFilter(new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
        return $twig;
    }

    /**
     * Removes css that comes with gutenberg
     */
    function wps_deregister_styles()
    {
        wp_dequeue_style('wp-block-library');
    }

    /**
     * Disable wp-embed script
    */
    function my_deregister_scripts(){
        wp_deregister_script( 'wp-embed' );
    }

    /**
     * Removes all dashboard widgets.
     *
     * @since 1.0.0
     */
    function wpc_remove_dashboard_widgets()
    {
        // Get global obj.
        global $wp_meta_boxes;
        unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
    }

}

new StarterSite();
