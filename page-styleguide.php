<?php
/**
 * Template name: Styleguide
 *
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
Timber::render( array( 'unique/styleguide.twig' ), $context );
