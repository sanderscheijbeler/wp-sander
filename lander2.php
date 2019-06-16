<?php
/**
 *
 * Template name: Lander 2
 *
 */


global $paged;
if (!isset($paged) || !$paged){
    $paged = 1;
}

$context = Timber::get_context();

$args = array(
    'post_type' => 'post',
    'posts_per_page' => 6,
    'orderby' => array(
        'date' => 'DESC'
    ),
    'paged' => $paged
);
$context['posts'] = new Timber\PostQuery($args);
$context['page_categories'] = Timber::get_terms('categories');

$templates = array( 'list-1xl-2-4.twig' );
Timber::render( $templates, $context );
