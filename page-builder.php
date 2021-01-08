<?php
/**
 * Template name: Page builder
 *
 */

$context = Timber::get_context();
$context['post'] = new Timber\Post();
Timber::render( array( 'page/page-builder.twig' ), $context );
