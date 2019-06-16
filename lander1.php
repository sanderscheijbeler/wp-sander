<?php
/**
 *
 * Template name: Lander 1
 *
 */


global $paged;
if (!isset($paged) || !$paged){
    $paged = 1;
}


$context = Timber::get_context();

$context['page_categories'] = Timber::get_terms('categories');

$args = array(
    'post_type' => 'post',
    'posts_per_page' => -1,
    'orderby' => array(
        'date' => 'DESC'
    ),
    'paged' => $paged
);
$context['posts'] = new Timber\PostQuery($args);

$templates = array( 'list-large-items.twig' );
Timber::render( $templates, $context );
