'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-learn documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-11bc688025f45ec0e2f19720710f9b40fdeb753ff92e5df5df7c62cbee6d9e679352d46040e0e449922cf3d9ffc2f7669cd792147ef3d6777888d1f6d6f3e2af"' : 'data-target="#xs-controllers-links-module-AppModule-11bc688025f45ec0e2f19720710f9b40fdeb753ff92e5df5df7c62cbee6d9e679352d46040e0e449922cf3d9ffc2f7669cd792147ef3d6777888d1f6d6f3e2af"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-11bc688025f45ec0e2f19720710f9b40fdeb753ff92e5df5df7c62cbee6d9e679352d46040e0e449922cf3d9ffc2f7669cd792147ef3d6777888d1f6d6f3e2af"' :
                                            'id="xs-controllers-links-module-AppModule-11bc688025f45ec0e2f19720710f9b40fdeb753ff92e5df5df7c62cbee6d9e679352d46040e0e449922cf3d9ffc2f7669cd792147ef3d6777888d1f6d6f3e2af"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-11bc688025f45ec0e2f19720710f9b40fdeb753ff92e5df5df7c62cbee6d9e679352d46040e0e449922cf3d9ffc2f7669cd792147ef3d6777888d1f6d6f3e2af"' : 'data-target="#xs-injectables-links-module-AppModule-11bc688025f45ec0e2f19720710f9b40fdeb753ff92e5df5df7c62cbee6d9e679352d46040e0e449922cf3d9ffc2f7669cd792147ef3d6777888d1f6d6f3e2af"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-11bc688025f45ec0e2f19720710f9b40fdeb753ff92e5df5df7c62cbee6d9e679352d46040e0e449922cf3d9ffc2f7669cd792147ef3d6777888d1f6d6f3e2af"' :
                                        'id="xs-injectables-links-module-AppModule-11bc688025f45ec0e2f19720710f9b40fdeb753ff92e5df5df7c62cbee6d9e679352d46040e0e449922cf3d9ffc2f7669cd792147ef3d6777888d1f6d6f3e2af"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CatsModule.html" data-type="entity-link" >CatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CatsModule-4950522083f65f9fcb3b749c279a0b0ca18c12384fdc5162e3538b6ffba305860650640def8ef8cce982d9cd85f12ea1afdb22913938ce693078bf5434613dcd"' : 'data-target="#xs-controllers-links-module-CatsModule-4950522083f65f9fcb3b749c279a0b0ca18c12384fdc5162e3538b6ffba305860650640def8ef8cce982d9cd85f12ea1afdb22913938ce693078bf5434613dcd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CatsModule-4950522083f65f9fcb3b749c279a0b0ca18c12384fdc5162e3538b6ffba305860650640def8ef8cce982d9cd85f12ea1afdb22913938ce693078bf5434613dcd"' :
                                            'id="xs-controllers-links-module-CatsModule-4950522083f65f9fcb3b749c279a0b0ca18c12384fdc5162e3538b6ffba305860650640def8ef8cce982d9cd85f12ea1afdb22913938ce693078bf5434613dcd"' }>
                                            <li class="link">
                                                <a href="controllers/CatsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CatsModule-4950522083f65f9fcb3b749c279a0b0ca18c12384fdc5162e3538b6ffba305860650640def8ef8cce982d9cd85f12ea1afdb22913938ce693078bf5434613dcd"' : 'data-target="#xs-injectables-links-module-CatsModule-4950522083f65f9fcb3b749c279a0b0ca18c12384fdc5162e3538b6ffba305860650640def8ef8cce982d9cd85f12ea1afdb22913938ce693078bf5434613dcd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CatsModule-4950522083f65f9fcb3b749c279a0b0ca18c12384fdc5162e3538b6ffba305860650640def8ef8cce982d9cd85f12ea1afdb22913938ce693078bf5434613dcd"' :
                                        'id="xs-injectables-links-module-CatsModule-4950522083f65f9fcb3b749c279a0b0ca18c12384fdc5162e3538b6ffba305860650640def8ef8cce982d9cd85f12ea1afdb22913938ce693078bf5434613dcd"' }>
                                        <li class="link">
                                            <a href="injectables/CatsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-47d1f261d1fd52bbdd8e039d3389abc64913d6673a2dba15a3df3c368c5ba0fcb54cef29c3de53d1938f722f10698e0d53b5933333a94bec8d6b9e0f8522665a"' : 'data-target="#xs-controllers-links-module-UsersModule-47d1f261d1fd52bbdd8e039d3389abc64913d6673a2dba15a3df3c368c5ba0fcb54cef29c3de53d1938f722f10698e0d53b5933333a94bec8d6b9e0f8522665a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-47d1f261d1fd52bbdd8e039d3389abc64913d6673a2dba15a3df3c368c5ba0fcb54cef29c3de53d1938f722f10698e0d53b5933333a94bec8d6b9e0f8522665a"' :
                                            'id="xs-controllers-links-module-UsersModule-47d1f261d1fd52bbdd8e039d3389abc64913d6673a2dba15a3df3c368c5ba0fcb54cef29c3de53d1938f722f10698e0d53b5933333a94bec8d6b9e0f8522665a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-47d1f261d1fd52bbdd8e039d3389abc64913d6673a2dba15a3df3c368c5ba0fcb54cef29c3de53d1938f722f10698e0d53b5933333a94bec8d6b9e0f8522665a"' : 'data-target="#xs-injectables-links-module-UsersModule-47d1f261d1fd52bbdd8e039d3389abc64913d6673a2dba15a3df3c368c5ba0fcb54cef29c3de53d1938f722f10698e0d53b5933333a94bec8d6b9e0f8522665a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-47d1f261d1fd52bbdd8e039d3389abc64913d6673a2dba15a3df3c368c5ba0fcb54cef29c3de53d1938f722f10698e0d53b5933333a94bec8d6b9e0f8522665a"' :
                                        'id="xs-injectables-links-module-UsersModule-47d1f261d1fd52bbdd8e039d3389abc64913d6673a2dba15a3df3c368c5ba0fcb54cef29c3de53d1938f722f10698e0d53b5933333a94bec8d6b9e0f8522665a"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CatsController.html" data-type="entity-link" >CatsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cat.html" data-type="entity-link" >Cat</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCatDto.html" data-type="entity-link" >CreateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatsService.html" data-type="entity-link" >CatsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomThrottlerGuard.html" data-type="entity-link" >CustomThrottlerGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JoiValidationPipe.html" data-type="entity-link" >JoiValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JoiValidationPipe-1.html" data-type="entity-link" >JoiValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});