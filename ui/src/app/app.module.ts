import { AppComponent } from './app.component';
import { AppRoutingModule } from '@pages/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ENVIRONMENT_TOKEN } from '@shared/lib';
import { GraphQLModule } from './graph-ql.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from './store.module';
import { environment } from '@env/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, StoreModule, GraphQLModule, HttpClientModule],
    providers: [
        {
            provide: ENVIRONMENT_TOKEN,
            useValue: environment,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
