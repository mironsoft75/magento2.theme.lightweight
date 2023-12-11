/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define(['jquery', 'mage/smart-keyboard-handler', 'mage/mage', 'mage/ie-class-fixer', 'domReady!'], function ($, keyboardHandler) {
    'use strict';

    if ($('body').hasClass('checkout-cart-index')) {
        if ($('#co-shipping-method-form .fieldset.rates').length > 0 && $('#co-shipping-method-form .fieldset.rates :checked').length === 0) {
            $('#block-shipping').on('collapsiblecreate', function () {
                $('#block-shipping').collapsible('forceActivate');
            });
        }
    }

    $('.cart-summary').mage('sticky', {
        container: '#maincontent'
    });

    $('.header.right > .header.links').clone().appendTo('#store\\.links');

    keyboardHandler.apply();

    jQuery('.navigation .level0.submenu > .level1 > a').hover(function () {

        jQuery(this).addClass('has-submenu');
        if (jQuery(this).parent().hasClass('parent')) {
            jQuery(this).parent().children('a').each(function () {
                jQuery('.level1 > a').addClass('set-inactive');
            });
        } else {
            jQuery(this).parent().children('a').each(function () {
                jQuery('.level1 > a').removeClass('set-inactive');
            });
        }
        jQuery(this).removeClass('set-inactive');

    });

    jQuery('.navigation li.level0:not(.nav-external-link) > a').hover(function () {
        jQuery('.page-header').addClass("menu-overlay");
        jQuery('.navigation li.level0 a').removeClass('set-inactive');
    });

    jQuery(".navigation .level0:not(.nav-external-link) > a").mouseenter(function (e) {
        jQuery('.header-after').addClass("active");
    });

    jQuery(".navigation .level0.nav-external-link > a").mouseenter(function (e) {
        jQuery('.header-after').removeClass("active");
    });

    jQuery('.header-after, .nav-sections-items').mouseleave(function (e) {
        jQuery('.header-after').removeClass("active");
    });

    $(document).on('swatch.initialized', function () {
        jQuery('.swatch-attribute-options > select').parent().addClass('has-select');
        jQuery('.swatch-attribute-options .swatch-option.text').each(function() {
            if(jQuery(this).text() === 'null' || !jQuery(this).text().length) {
                if(jQuery(this).attr('option-label').length) {
                    jQuery(this).text(jQuery(this).attr('option-label'));
                }
            }
        })
    });

    $(document).on('configurable.initialized', function () {
        jQuery('.product-options-wrapper .field:not(:first-of-type) select').each(function() {
            if(jQuery(this).val() && jQuery('#' + jQuery(this).attr('id') + ' option').length >= 3) {
                jQuery(this).closest('.field.configurable').addClass('show');
            }
            var i = 1;
            var numberOfShownSelects = jQuery('.product-options-wrapper .field.show');
            if(numberOfShownSelects.length) {
                jQuery(numberOfShownSelects).each(function() {
                    if(++i % 2 == 0) {
                        jQuery(this).closest('.field.configurable').addClass('odd');
                    }
                })
            }
        });
        jQuery('.product-options-wrapper select').change(function () {
            var nextSelectId = '#' + jQuery(this).closest('.field.configurable').next().find('select').attr('id');
            var nextSelectContainer = jQuery(this).closest('.field.configurable').next('.field.configurable');
            jQuery(this).closest('.field.configurable').next().nextAll('.field.configurable').removeClass('show odd');
            if (jQuery(nextSelectId + " option").length < 3) {
                jQuery(nextSelectId + " option").each(function () {
                    if (jQuery(this).val()) {
                        jQuery(nextSelectContainer).removeClass('show odd');
                        jQuery(nextSelectId).val(jQuery(this).val()).change();
                    }
                });
            } else {
                var numberOfShownSelects = jQuery('.product-options-wrapper .field.show').length;
                if (numberOfShownSelects % 2 == 0) {
                    jQuery(nextSelectContainer).addClass('odd');
                }
                jQuery(nextSelectContainer).addClass('show');
            }
            if (!jQuery(this).val()) {
                jQuery(this).closest('.field.configurable').nextAll('.field.configurable').removeClass('show odd');
            }
        });
    });
});
