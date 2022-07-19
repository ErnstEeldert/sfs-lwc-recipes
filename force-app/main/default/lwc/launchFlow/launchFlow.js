import { LightningElement } from 'lwc';
import userId from '@salesforce/user/Id';
import { NavigationMixin } from 'lightning/navigation';
import { getLocationService } from 'lightning/mobileCapabilities';
 
const FLOW_DEVELOPER_NAME = 'Sample_Flow';

export default class LaunchFlow extends NavigationMixin(LightningElement) {

    locationService;
    currentLocation;
    url;
    timezone;

    connectedCallback() {
        this.locationService = getLocationService();
        this.currentLocation = null;
        this.url = `com.salesforce.fieldservice://v1/sObject/${userId}/flow/${FLOW_DEVELOPER_NAME}`;
        this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.url += `?timezone=${this.timezone}`;
        if(this.locationService != null && this.locationService.isAvailable()) {
            console.log('fetching location');
            // Configure options for location request
            const locationOptions = {
                enableHighAccuracy: true
            }

            this.locationService.getCurrentPosition(locationOptions)
            .then((result)  => {
                this.currentLocation = result;
                if (this.currentLocation != null) {
                    this.url += `&latitude=${this.currentLocation.coords.latitude}&longitude=${this.currentLocation.coords.longitude}`
                }
                // result is a Location object
                console.log(JSON.stringify(result));
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            })
            .finally(()=> {
                console.log(`url: ${this.url}`);
                try {
                    this[NavigationMixin.Navigate]({
                        'type': 'standard__webPage',
                        'attributes': {
                            url: this.url
                        }
                    });
                } catch (e) {
                    console.error('Unable to navigate: ' + e);
                }
            });
        } else {
            console.log('not able to fetch location!');
        }
    }

}