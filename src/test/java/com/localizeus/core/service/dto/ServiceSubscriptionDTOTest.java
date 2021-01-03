package com.localizeus.core.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class ServiceSubscriptionDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceSubscriptionDTO.class);
        ServiceSubscriptionDTO serviceSubscriptionDTO1 = new ServiceSubscriptionDTO();
        serviceSubscriptionDTO1.setId(1L);
        ServiceSubscriptionDTO serviceSubscriptionDTO2 = new ServiceSubscriptionDTO();
        assertThat(serviceSubscriptionDTO1).isNotEqualTo(serviceSubscriptionDTO2);
        serviceSubscriptionDTO2.setId(serviceSubscriptionDTO1.getId());
        assertThat(serviceSubscriptionDTO1).isEqualTo(serviceSubscriptionDTO2);
        serviceSubscriptionDTO2.setId(2L);
        assertThat(serviceSubscriptionDTO1).isNotEqualTo(serviceSubscriptionDTO2);
        serviceSubscriptionDTO1.setId(null);
        assertThat(serviceSubscriptionDTO1).isNotEqualTo(serviceSubscriptionDTO2);
    }
}
