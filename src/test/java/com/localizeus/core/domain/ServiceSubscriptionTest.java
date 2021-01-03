package com.localizeus.core.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class ServiceSubscriptionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceSubscription.class);
        ServiceSubscription serviceSubscription1 = new ServiceSubscription();
        serviceSubscription1.setId(1L);
        ServiceSubscription serviceSubscription2 = new ServiceSubscription();
        serviceSubscription2.setId(serviceSubscription1.getId());
        assertThat(serviceSubscription1).isEqualTo(serviceSubscription2);
        serviceSubscription2.setId(2L);
        assertThat(serviceSubscription1).isNotEqualTo(serviceSubscription2);
        serviceSubscription1.setId(null);
        assertThat(serviceSubscription1).isNotEqualTo(serviceSubscription2);
    }
}
