import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ENVIRONMENT } from 'src/core/services/environment.service';
import { GraphQLModule } from '@core/graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        GraphQLModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: ENVIRONMENT,
            useValue: environment,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
